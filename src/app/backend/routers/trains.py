from fastapi import APIRouter
from ..services import features

router = APIRouter()

@router.get("/features/{train_id}", tags=["Features"])
async def read_train_features(train_id: str):
    """
    Retrieves the complete feature vector for a single train.
    """
    return features.get_train_features(train_id)