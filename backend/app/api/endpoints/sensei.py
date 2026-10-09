"""
LearnFootball API - AI Tutor Endpoints

Endpoints for the AI-powered football tutor chat.
"""

from typing import Any

from fastapi import APIRouter, status
from app.services.tutor import TutorService

router = APIRouter(prefix="/tutor", tags=["AI Tutor"])
tutor_service = TutorService()


@router.post(
    "/chat",
    status_code=status.HTTP_200_OK,
    summary="Send a chat message to the AI tutor",
    response_description="AI tutor response",
)
async def chat(payload: dict[str, Any]) -> dict:
    """
    Accept a user message and return an AI-generated response
    about football topics using the Gemini model.
    """
    user_message = payload.get("message", "")
    mode = payload.get("mode", "intermediate")

    response_data = await tutor_service.get_tutor_response(user_message, mode)
    return {
        "user_message": user_message,
        "ai_response": response_data["ai_response"],
        "sources": response_data["sources"],
    }
