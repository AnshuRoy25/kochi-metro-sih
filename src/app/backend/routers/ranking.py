from fastapi import APIRouter
from ..services import ranker

router = APIRouter()

@router.get("/rank", tags=["Ranking"])
async def read_ranked_list():
    """
    Retrieves the ranked list of trains ready for service based on current data.
    """
    return ranker.get_ranked_trains()