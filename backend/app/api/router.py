"""
LearnFootball API - Main Router

Aggregates all endpoint sub-routers under a single API router.
"""

from fastapi import APIRouter

from app.api.endpoints import (
    academy,
    admin,
    coaches,
    favorites,
    glossary,
    players,
    predictor,
    quiz,
    teams,
    sensei,
    users,
)

api_router = APIRouter()

api_router.include_router(academy.router)
api_router.include_router(players.router)
api_router.include_router(teams.router)
api_router.include_router(coaches.router)
api_router.include_router(glossary.router)
api_router.include_router(predictor.router)
api_router.include_router(sensei.router)
api_router.include_router(quiz.router)
api_router.include_router(users.router)
api_router.include_router(favorites.router)
api_router.include_router(admin.router)
