"""
TacticSensei API - AI Sensei Endpoints

Endpoints for the AI-powered football sensei chat.
"""

from typing import Any

from fastapi import APIRouter, status
from app.services.sensei import SenseiService

router = APIRouter(prefix="/sensei", tags=["AI Sensei"])
sensei_service = SenseiService()


@router.post(
    "/chat",
    status_code=status.HTTP_200_OK,
    summary="Send a chat message to the AI sensei",
    response_description="AI sensei response",
)
async def chat(payload: dict[str, Any]) -> dict:
    """
    Accept a user message and return an AI-generated response
    about football topics using the Gemini model.
    """
    user_message = payload.get("message", "")
    mode = payload.get("mode", "intermediate")

    response_data = await sensei_service.get_sensei_response(user_message, mode)
    return {
        "user_message": user_message,
        "ai_response": response_data["ai_response"],
        "sources": response_data["sources"],
    }
