"""
LearnFootball API - Application Entry Point

FastAPI application with CORS, lifespan management, and API routing.
"""

import logging
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_settings

# Load .env before anything reads os.environ
load_dotenv()

logger = logging.getLogger("learnfootball")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Application lifespan: runs on startup and shutdown."""
    settings = get_settings()
    logger.info(
        "LearnFootball API starting up — env=%s, debug=%s",
        settings.APP_ENV,
        settings.APP_DEBUG,
    )
    yield
    logger.info("LearnFootball API shutting down")


def create_app() -> FastAPI:
    """Application factory that builds and configures the FastAPI instance."""
    settings = get_settings()

    app = FastAPI(
        title="LearnFootball API",
        version="1.0.0",
        description="API for the LearnFootball educational platform",
        lifespan=lifespan,
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_origin_regex=r"https://.*\.vercel\.app|http://(localhost|127\.0\.0\.1):\d+",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Mount all API routes under /api/v1
    app.include_router(api_router, prefix="/api/v1")

    # Root health check
    @app.get(
        "/health",
        tags=["Health"],
        summary="Health check",
        response_description="API health status",
    )
    async def health_check() -> dict:
        """Return the current health status of the API."""
        return {"status": "healthy", "version": "1.0.0"}

    return app


app = create_app()
