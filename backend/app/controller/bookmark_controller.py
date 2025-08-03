from fastapi import HTTPException, status
from pymongo.errors import PyMongoError
from app.schema.bookmark_schema import BookmarkRequest
from app.utils.dbConnect import bookmarks_collection

async def save_bookmark(data: BookmarkRequest):
    try:
        existing = await bookmarks_collection.find_one({
            "email": data.email,
            "url": data.url
        })

        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This article is already bookmarked by the user."
            )

        result = await bookmarks_collection.insert_one(data.dict())
        return {
            "message": "Bookmark saved successfully.",
            "bookmark_id": str(result.inserted_id)
        }

    except PyMongoError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )
