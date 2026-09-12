"""
LearnFootball API - Admin Endpoints

Administrative content management: stats overview, CRUD for lessons, players,
teams, coaches, glossary, and quizzes. All endpoints require admin role.
"""

from typing import Any

from fastapi import APIRouter, Depends, Query, status
from pydantic import BaseModel

from app.middleware.require_admin import require_admin
from app.middleware.auth import UserClaims
from app.core.supabase_client import get_supabase

router = APIRouter(prefix="/admin", tags=["Admin"])

# ── Pydantic models ───────────────────────────────────────────────────────────


class LessonBody(BaseModel):
    title: str
    slug: str
    category: str
    difficulty: str
    content: str


class GlossaryBody(BaseModel):
    term: str
    slug: str
    category: str
    definition: str
    advanced_explanation: str | None = None


class PlayerBody(BaseModel):
    name: str
    slug: str
    nationality: str
    position: str
    biography: str | None = None


class TeamBody(BaseModel):
    name: str
    slug: str
    country: str
    description: str | None = None


# ── Stats ─────────────────────────────────────────────────────────────────────


@router.get(
    "/stats",
    status_code=status.HTTP_200_OK,
    summary="Get admin overview stats",
    response_description="Counts for all content types and users",
)
async def get_admin_stats(
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    """Return aggregate counts for dashboard cards."""
    supabase = get_supabase()

    def count(table: str) -> int:
        res = supabase.table(table).select("id", count="exact").execute()
        return res.count or 0

    return {
        "users": count("users"),
        "lessons": count("lessons"),
        "players": count("player_profiles"),
        "teams": count("team_profiles"),
        "coaches": count("coach_profiles"),
        "glossary": count("glossary_terms"),
        "quizzes": count("quizzes"),
    }


# ── Generic paginated list ────────────────────────────────────────────────────

TABLE_MAP = {
    "lessons": "lessons",
    "players": "player_profiles",
    "teams": "team_profiles",
    "coaches": "coach_profiles",
    "glossary": "glossary_terms",
    "quizzes": "quizzes",
    "users": "users",
}


@router.get(
    "/content/{section}",
    status_code=status.HTTP_200_OK,
    summary="List entries for a content section",
    response_description="Paginated list of content entries",
)
async def list_section(
    section: str,
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    """Return a paginated list of entries for the given section (e.g. 'glossary', 'players')."""
    table = TABLE_MAP.get(section)
    if not table:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail=f"Unknown section: {section}")

    supabase = get_supabase()
    response = (
        supabase.table(table)
        .select("*", count="exact")
        .order("created_at", desc=True)
        .range(offset, offset + limit - 1)
        .execute()
    )
    return {
        "section": section,
        "data": response.data or [],
        "total": response.count or 0,
        "limit": limit,
        "offset": offset,
    }


# ── Lessons ───────────────────────────────────────────────────────────────────


@router.post("/lesson", status_code=status.HTTP_201_CREATED, summary="Create a lesson")
async def create_lesson(
    body: LessonBody,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    res = supabase.table("lessons").insert(body.model_dump()).execute()
    return {"data": res.data[0] if res.data else {}}


@router.put("/lesson/{id}", status_code=status.HTTP_200_OK, summary="Update a lesson")
async def update_lesson(
    id: str,
    body: LessonBody,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    res = supabase.table("lessons").update(body.model_dump()).eq("id", id).execute()
    return {"data": res.data[0] if res.data else {}}


@router.delete("/lesson/{id}", status_code=status.HTTP_200_OK, summary="Delete a lesson")
async def delete_lesson(
    id: str,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    supabase.table("lessons").delete().eq("id", id).execute()
    return {"deleted": id}


# ── Glossary ──────────────────────────────────────────────────────────────────


@router.post("/glossary", status_code=status.HTTP_201_CREATED, summary="Create a glossary term")
async def create_glossary(
    body: GlossaryBody,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    res = supabase.table("glossary_terms").insert(body.model_dump()).execute()
    return {"data": res.data[0] if res.data else {}}


@router.put("/glossary/{id}", status_code=status.HTTP_200_OK, summary="Update a glossary term")
async def update_glossary(
    id: str,
    body: GlossaryBody,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    res = supabase.table("glossary_terms").update(body.model_dump()).eq("id", id).execute()
    return {"data": res.data[0] if res.data else {}}


@router.delete("/glossary/{id}", status_code=status.HTTP_200_OK, summary="Delete a glossary term")
async def delete_glossary(
    id: str,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    supabase.table("glossary_terms").delete().eq("id", id).execute()
    return {"deleted": id}


# ── Players ───────────────────────────────────────────────────────────────────


@router.post("/player", status_code=status.HTTP_201_CREATED, summary="Create a player")
async def create_player(
    body: PlayerBody,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    res = supabase.table("players").insert(body.model_dump()).execute()
    return {"data": res.data[0] if res.data else {}}


@router.put("/player/{id}", status_code=status.HTTP_200_OK, summary="Update a player")
async def update_player(
    id: str,
    body: PlayerBody,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    res = supabase.table("players").update(body.model_dump()).eq("id", id).execute()
    return {"data": res.data[0] if res.data else {}}


@router.delete("/player/{id}", status_code=status.HTTP_200_OK, summary="Delete a player")
async def delete_player(
    id: str,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    supabase.table("players").delete().eq("id", id).execute()
    return {"deleted": id}


# ── Teams ─────────────────────────────────────────────────────────────────────


@router.post("/team", status_code=status.HTTP_201_CREATED, summary="Create a team")
async def create_team(
    body: TeamBody,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    res = supabase.table("teams").insert(body.model_dump()).execute()
    return {"data": res.data[0] if res.data else {}}


@router.put("/team/{id}", status_code=status.HTTP_200_OK, summary="Update a team")
async def update_team(
    id: str,
    body: TeamBody,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    res = supabase.table("teams").update(body.model_dump()).eq("id", id).execute()
    return {"data": res.data[0] if res.data else {}}


@router.delete("/team/{id}", status_code=status.HTTP_200_OK, summary="Delete a team")
async def delete_team(
    id: str,
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    supabase = get_supabase()
    supabase.table("team_profiles").delete().eq("id", id).execute()
    return {"deleted": id}


# ── Seed ──────────────────────────────────────────────────────────────────────


@router.post(
    "/seed",
    status_code=status.HTTP_200_OK,
    summary="Seed the database from static JSON files",
    response_description="Counts of records inserted",
)
async def seed_database(
    user: UserClaims = Depends(require_admin),
) -> dict[str, Any]:
    """Trigger a full database seed from the JSON data files.
    Idempotent — existing records (matched by slug) are skipped."""
    import sys
    import os
    from pathlib import Path

    scripts_dir = Path(__file__).resolve().parent.parent.parent.parent / "scripts"
    sys.path.insert(0, str(scripts_dir.parent))

    try:
        from scripts.seed_database import seed_glossary, seed_profiles, seed_curriculum

        g = seed_glossary()
        p = seed_profiles()
        c = seed_curriculum()

        return {
            "status": "ok",
            "inserted": {
                "glossary_terms": g,
                "players": p["players"],
                "coaches": p["coaches"],
                "teams": p["teams"],
                "lessons": c["lessons"],
                "quizzes": c["quizzes"],
                "quiz_questions": c["questions"],
            },
        }
    except Exception as exc:
        from fastapi import HTTPException
        raise HTTPException(
            status_code=500,
            detail=f"Seeding failed: {exc}",
        ) from exc
