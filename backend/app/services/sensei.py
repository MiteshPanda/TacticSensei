"""
LearnFootball AI - Tutor Service

Service that integrates with the Google Gemini API to provide structured,
context-aware answers to user football questions.
"""

import json
import os
from typing import Any
import google.generativeai as genai
from app.core.config import get_settings

settings = get_settings()


class TutorService:
    """Service to query the Gemini API with curriculum-informed prompts."""

    def __init__(self) -> None:
        self.curriculum_data = self._load_curriculum_data()
        self.api_initialized = False

    def _load_curriculum_data(self) -> dict[str, Any]:
        """Loads the pre-compiled curriculum database JSON file."""
        try:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            db_path = os.path.join(base_dir, "data", "curriculum_db.json")
            if os.path.exists(db_path):
                with open(db_path, "r", encoding="utf-8") as f:
                    return json.load(f)
        except Exception:
            pass
        return {"curriculum": [], "formations": {}, "tactics": {}}

    def _initialize_api(self) -> None:
        """Configures the Google Generative AI client with the API key."""
        if not self.api_initialized and settings.GEMINI_API_KEY:
            try:
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self.api_initialized = True
            except Exception:
                pass

    def retrieve_context(self, message: str) -> tuple[str, list[dict[str, Any]]]:
        """
        Scans curriculum_db.json for lessons related to keywords in the user query.
        Returns a formatted context block and list of sources.
        """
        message_lower = message.lower()
        matched_lessons = []
        sources = []

        # 1. Search Formations
        formations = self.curriculum_data.get("formations", {})
        for formation in formations.values():
            slug = formation.get("slug", "").lower()
            title = formation.get("title", "").lower()
            if slug in message_lower or title in message_lower:
                matched_lessons.append(formation)
                sources.append({
                    "title": formation.get("title"),
                    "type": "formations",
                    "slug": formation.get("slug"),
                })

        # 2. Search Tactics
        tactics = self.curriculum_data.get("tactics", {})
        for tactic in tactics.values():
            slug = tactic.get("slug", "").lower()
            title = tactic.get("title", "").lower()
            if (
                slug in message_lower
                or title in message_lower
                or slug.replace("-", " ") in message_lower
            ):
                matched_lessons.append(tactic)
                sources.append({
                    "title": tactic.get("title"),
                    "type": "tactics",
                    "slug": tactic.get("slug"),
                })

        # 3. Search General Curriculum (Rules/Positions)
        curriculum_list = self.curriculum_data.get("curriculum", [])
        for mod in curriculum_list:
            mod_slug = mod.get("slug", "")
            for lesson in mod.get("lessons", []):
                slug = lesson.get("slug", "").lower()
                title = lesson.get("title", "").lower()
                if (
                    slug in message_lower or title in message_lower
                ) and not any(s["slug"] == lesson.get("slug") for s in sources):
                    sources.append({
                        "title": lesson.get("title"),
                        "type": mod_slug,
                        "slug": lesson.get("slug"),
                    })
                    matched_lessons.append({
                        "title": lesson.get("title"),
                        "description": lesson.get("description"),
                        "introduction": lesson.get("description"),
                        "sections": [],
                    })

        # Build context prompt extension
        context_str = ""
        if matched_lessons:
            context_str = "RELEVANT CURRICULUM CONTEXT FROM LEARNFOOTBALL:\n"
            for lesson in matched_lessons[:3]:  # Limit context to top 3 lessons
                context_str += f"\n--- Lesson: {lesson.get('title')} ---\n"
                context_str += f"Description: {lesson.get('description')}\n"
                if lesson.get("introduction"):
                    context_str += f"Introduction: {lesson.get('introduction')}\n"
                sections = lesson.get("sections", [])
                for s in sections:
                    context_str += f"{s.get('heading')}: {s.get('content')}\n"
            context_str += (
                "\nUse the context above as your primary source of truth. "
                "If the user asks an unrelated football question, respond using general football knowledge.\n"
            )

        return context_str, sources

    async def get_tutor_response(self, message: str, mode: str = "intermediate") -> dict[str, Any]:
        """Queries the Gemini API with the user message, context, and selected mode."""
        self._initialize_api()

        if not self.api_initialized or not settings.GEMINI_API_KEY:
            return {
                "ai_response": (
                    "I'm sorry, but the AI Tutor is currently in offline demo mode "
                    "because the `GEMINI_API_KEY` is not configured in the backend `.env` file.\n\n"
                    "Please obtain a free API key from Google AI Studio (https://aistudio.google.com/) "
                    "and update your backend `.env` file to enable live responses."
                ),
                "sources": [],
            }

        context_str, sources = self.retrieve_context(message)

        # Learning mode instructions
        mode_instructions = {
            "beginner": (
                "Target Audience: Absolute beginner. Explain concepts with very simple analogies, "
                "everyday language, and no unexplained jargon. Explain like the user is 10 years old."
            ),
            "intermediate": (
                "Target Audience: Casual football fan. You can use standard football terminology, "
                "provide basic tactical context, and reference real-world examples."
            ),
            "advanced": (
                "Target Audience: Tactical nerd. Provide highly detailed breakdowns. "
                "Discuss spacing, positional dynamics (e.g. half-spaces, central overloads, defensive shifting), "
                "player roles, transition mechanics, and tactical counters."
            ),
        }

        instruction = mode_instructions.get(mode.lower(), mode_instructions["intermediate"])

        system_prompt = f"""You are the LearnFootball AI Tutor, named Tactical Mentor.
Your goal is to help users learn football concepts through natural conversation.

{instruction}

YOUR RESPONSE MUST FOLLOW THIS EXACT STRUCTURE:

### Short Answer
[Provide a quick 1-2 sentence summary defining or explaining the concept.]

### Detailed Explanation
[Provide the main body of your educational response, broken down into readable paragraphs.]

### Real Football Example
[Mention a specific team, player, manager, or historical moment that illustrates this concept in action.]

### Related Concepts
* [Suggest 2-3 other concepts or lessons from the curriculum that the user might want to explore next.]

SAFETY RULES:
- Avoid inventing football facts or statistics. If you don't know, say "I don't know" rather than guessing.
- Keep your tone encouraging, professional, and educational.
"""

        full_prompt = f"{system_prompt}\n\n{context_str}\n\nUser Question: {message}\nAI Tutor Response:"

        try:
            model = genai.GenerativeModel("gemini-2.5-flash")
            import asyncio
            loop = asyncio.get_running_loop()
            response = await loop.run_in_executor(None, lambda: model.generate_content(full_prompt))
            ai_text = response.text.strip()

            return {"ai_response": ai_text, "sources": sources}
        except Exception as e:
            return {
                "ai_response": f"An error occurred while connecting to the Gemini AI API: {str(e)}",
                "sources": [],
            }

