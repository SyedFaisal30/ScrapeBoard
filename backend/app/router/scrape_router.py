from fastapi import APIRouter, HTTPException
from app.controller.scrape_controller import scrape_website
import traceback
router = APIRouter()

@router.get("/scrape")
async def scrape():
    try:
        data = await scrape_website()
        return {"scraped_data": data}
    except Exception as e:
        print(f"SCRAPER ERROR: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
