from fastapi import APIRouter
from app.schema.bookmark_schema import BookmarkRequest
from app.controller.bookmark_controller import save_bookmark
from app.controller.get_user_bookmark import get_user_bookmarks
from app.controller.delete_bookmark import delete_bookmark_by_id
router = APIRouter(prefix="/bookmark", tags=["Bookmarks"])

@router.post("/")
async def bookmark_article(data: BookmarkRequest):
    return await save_bookmark(data)

@router.get("/{email}")
async def get_bookmarks(email: str):
    return await get_user_bookmarks(email)

@router.delete("/{bookmark_id}")
async def unbookmark_article(bookmark_id: str):  
    return await delete_bookmark_by_id(bookmark_id)
