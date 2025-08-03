from fastapi import HTTPException, status
from bson import ObjectId
from pymongo.errors import PyMongoError
from app.utils.dbConnect import bookmarks_collection

async def delete_bookmark_by_id(bookmark_id: str):
    try:
        if not ObjectId.is_valid(bookmark_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid bookmark ID format."
            )

        result = await bookmarks_collection.delete_one({"_id": ObjectId(bookmark_id)})

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Bookmark not found."
            )

        return {"message": "Bookmark deleted successfully."}

    except PyMongoError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )
