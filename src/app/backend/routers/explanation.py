from fastapi import APIRouter
from services import explanation

router = APIRouter()

@router.get("/explanation/{train_id}", tags=["Explanation"])
async def read_train_explanation(train_id: str):
    """
    Retrieves a detailed explanation for a train's ranking or status.
    """
    return explanation.get_train_explanation(train_id)