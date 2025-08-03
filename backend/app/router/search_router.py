from fastapi import APIRouter, HTTPException
from app.controller.search_controller import scrape_topic_news

router = APIRouter()

@router.get("/search/{topic}")
async def search_topic(topic: str):
    return await scrape_topic_news(topic)
