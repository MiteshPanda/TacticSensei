"""
LearnFootball - Database Seeding Script (Supabase REST API version)
====================================================================
Uses the Supabase Python client (supabase-py) with your SERVICE_ROLE_KEY
to insert records — no direct PostgreSQL connection required.

Run from the backend directory:
    python scripts/seed_database.py
"""

import json
import sys
from pathlib import Path

# ── Path setup ────────────────────────────────────────────────────────────────
BACKEND_DIR = Path(__file__).resolve().parent.parent   # …/backend/
DATA_DIR = BACKEND_DIR / "app" / "data"
sys.path.insert(0, str(BACKEND_DIR))

from dotenv import load_dotenv
load_dotenv(BACKEND_DIR / ".env")

import os
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌  SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# ── Helpers ───────────────────────────────────────────────────────────────────

def _load_json(filename: str):
    path = DATA_DIR / filename
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _existing_slugs(table: str) -> set[str]:
    """Fetch all slugs already in the table so we can skip duplicates."""
    res = supabase.table(table).select("slug").execute()
    return {row["slug"] for row in (res.data or [])}


def _batch_insert(table: str, rows: list[dict], batch_size: int = 50) -> int:
    """Upsert rows in batches (skip duplicates); returns count of rows processed."""
    inserted = 0
    for i in range(0, len(rows), batch_size):
        chunk = rows[i : i + batch_size]
        # upsert: on conflict with the unique slug column, do nothing
        supabase.table(table).upsert(chunk, on_conflict="slug", ignore_duplicates=True).execute()
        inserted += len(chunk)
    return inserted


# ── Seed functions ────────────────────────────────────────────────────────────

def seed_glossary() -> int:
    data: list[dict] = _load_json("glossary_db.json")
    existing = _existing_slugs("glossary_terms")

    rows = []
    for item in data:
        slug = item.get("slug") or item.get("term", "").lower().replace(" ", "-")
        if slug in existing:
            continue
        rows.append({
            "term":                 item.get("term", ""),
            "slug":                 slug,
            "category":             item.get("category"),
            "definition":           item.get("definition", ""),
            "advanced_explanation": item.get("advanced_explanation")
                                    or item.get("advancedExplanation"),
        })

    return _batch_insert("glossary_terms", rows) if rows else 0


def seed_profiles() -> dict:
    data = _load_json("profiles_static.json")
    counts = {"players": 0, "coaches": 0, "teams": 0}

    # ── Players ──────────────────────────────────────────────────────────────
    existing_players = _existing_slugs("player_profiles")
    player_rows = []
    for p in data.get("players", []):
        if p["slug"] in existing_players:
            continue
        player_rows.append({
            "api_id":       p.get("api_id"),
            "name":         p["name"],
            "slug":         p["slug"],
            "active":       p.get("active", True),
            "position":     p.get("position"),
            "country":      p.get("country"),
            "country_name": p.get("countryName"),
            "bio":          p.get("bio"),
            "style":        p.get("style"),
            "stats":        p.get("stats", []),
            "timeline":     p.get("timeline", []),
            "trophies":     p.get("trophies", []),
        })
    if player_rows:
        counts["players"] = _batch_insert("player_profiles", player_rows)

    # ── Coaches ──────────────────────────────────────────────────────────────
    existing_coaches = _existing_slugs("coach_profiles")
    coach_rows = []
    for c in data.get("coaches", []):
        if c["slug"] in existing_coaches:
            continue
        coach_rows.append({
            "api_id":       c.get("api_id"),
            "name":         c["name"],
            "slug":         c["slug"],
            "active":       c.get("active", True),
            "philosophy":   c.get("philosophy"),
            "club":         c.get("club"),
            "emoji":        c.get("emoji"),
            "country":      c.get("country"),
            "country_name": c.get("countryName"),
            "bio":          c.get("bio"),
            "stats":        c.get("stats", []),
            "timeline":     c.get("timeline", []),
            "trophies":     c.get("trophies", []),
        })
    if coach_rows:
        counts["coaches"] = _batch_insert("coach_profiles", coach_rows)

    # ── Teams ────────────────────────────────────────────────────────────────
    existing_teams = _existing_slugs("team_profiles")
    team_rows = []
    for t in data.get("teams", []):
        if t["slug"] in existing_teams:
            continue
        team_rows.append({
            "name":            t["name"],
            "slug":            t["slug"],
            "active":          t.get("active", True),
            "flag":            t.get("flag"),
            "titles":          t.get("titles"),
            "style":           t.get("style"),
            "squad":           t.get("squad", []),
            "stats":           t.get("stats", []),
            "timeline":        t.get("timeline", []),
            "trophies":        t.get("trophies", []),
            "world_cup_squad": t.get("worldCupSquad", []),
        })
    if team_rows:
        counts["teams"] = _batch_insert("team_profiles", team_rows)

    return counts


def seed_curriculum() -> dict:
    data = _load_json("curriculum_db.json")
    counts = {"lessons": 0, "quizzes": 0, "questions": 0}

    existing_lessons = _existing_slugs("lessons")
    curriculum_modules: list[dict] = data.get("curriculum", [])

    lesson_rows = []
    quiz_map: list[tuple[str, list]] = []   # (lesson_slug, quiz_questions)

    for module in curriculum_modules:
        module_slug = module.get("slug", "")
        for lesson_meta in module.get("lessons", []):
            slug = lesson_meta.get("slug", "")
            if not slug or slug in existing_lessons:
                continue

            rich = data.get(slug, {})
            content_sections = rich.get("sections", [])
            quiz_questions_raw = rich.get("quizQuestions", [])

            lesson_rows.append({
                "module_slug":   module_slug,
                "slug":          slug,
                "title":         lesson_meta.get("title", rich.get("title", slug)),
                "description":   lesson_meta.get("description", rich.get("description")),
                "reading_time":  lesson_meta.get("readingTime", 5),
                "difficulty":    lesson_meta.get("difficulty", "beginner"),
                "emoji":         lesson_meta.get("emoji"),
                "category":      lesson_meta.get("category"),
                "content":       content_sections,
            })

            if quiz_questions_raw:
                quiz_map.append((slug, quiz_questions_raw))

    # Insert lessons
    if lesson_rows:
        counts["lessons"] = _batch_insert("lessons", lesson_rows)

    # Insert quizzes + questions (need lesson IDs from DB)
    for lesson_slug, questions_raw in quiz_map:
        res = supabase.table("lessons").select("id").eq("slug", lesson_slug).execute()
        if not res.data:
            continue
        lesson_id = res.data[0]["id"]

        quiz_res = supabase.table("quizzes").insert({
            "lesson_id": lesson_id,
            "title": f"Quiz",
        }).execute()
        if not quiz_res.data:
            continue
        quiz_id = quiz_res.data[0]["id"]
        counts["quizzes"] += 1

        q_rows = [
            {
                "quiz_id":       quiz_id,
                "question":      q.get("question", ""),
                "options":       q.get("options", []),
                "correct_index": q.get("correctIndex", 0),
                "explanation":   q.get("explanation"),
                "order":         i,
            }
            for i, q in enumerate(questions_raw)
        ]
        counts["questions"] += _batch_insert("quiz_questions", q_rows)

    return counts


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print("🚀 LearnFootball Database Seeder (via Supabase REST API)")
    print("=" * 55)

    print("\n📖 Seeding Glossary Terms…")
    g = seed_glossary()
    print(f"   ✅ {g} new glossary terms inserted")

    print("\n👤 Seeding Player / Coach / Team Profiles…")
    p = seed_profiles()
    print(f"   ✅ Players: {p['players']}, Coaches: {p['coaches']}, Teams: {p['teams']}")

    print("\n📚 Seeding Curriculum (Lessons + Quizzes)…")
    c = seed_curriculum()
    print(f"   ✅ Lessons: {c['lessons']}, Quizzes: {c['quizzes']}, Questions: {c['questions']}")

    print("\n🎉 Seeding complete!")


if __name__ == "__main__":
    main()
