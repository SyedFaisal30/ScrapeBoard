from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import auth_router, scrape_router

app = FastAPI(
    title="ScrapeBoard",
    description="Get detailed AI-powered stats of any cricketer using Gemini.",
    version="1.0.0"
)

origins = [
    "http://localhost:5173", "https://123lms00-5173.inc1.devtunnels.ms"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

app.include_router(auth_router.router, prefix="/api")
app.include_router(scrape_router.router, prefix="/api")
