from fastapi import APIRouter, Query
from services import ranker
from typing import Optional

router = APIRouter()

@router.get("/rank", tags=["Ranking"])
async def read_ranked_list(limit: Optional[int] = Query(None, description="Number of top trains to return")):
    """
    Retrieves the ranked list of trains ready for service based on current data.
    
    Args:
        limit: Optional number of top trains to return (e.g., 5, 10, 15, 20)
    """
    return ranker.get_ranked_trains(limit=limit)
