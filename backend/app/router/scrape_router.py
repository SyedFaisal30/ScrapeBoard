from fastapi import APIRouter, HTTPException, Query
from app.controller.scrape_controller import scrape_website

router = APIRouter()

@router.get("/")
async def scrape(url: str = Query(..., description="URL to scrape")):
    try:
        data = await scrape_website(url)
        return {"scraped_data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
