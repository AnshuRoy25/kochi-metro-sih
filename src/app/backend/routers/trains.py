from fastapi import APIRouter
from services import features

router = APIRouter()

# Existing endpoint
@router.get("/features/{train_id}", tags=["Features"])
async def read_train_features(train_id: str):
    """
    Retrieves the complete feature vector for a single train.
    """
    return features.get_train_features(train_id)

# NEW ENDPOINT - Add this for train list
@router.get("/trains", tags=["Trains"])
async def read_all_trains():
    """
    Retrieves all trains data for the train list.
    """
    return features.get_all_trains()
