import pandas as pd
from fastapi import HTTPException
from pathlib import Path

# Build a path relative to this file to find the data
DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "mock_train_data.csv"

def get_train_features(train_id: str):
    """
    Loads train data and returns features for a specific train.
    """
    try:
        df = pd.read_csv(DATA_PATH)
        # Ensure consistent case for train_id lookup
        train_data = df[df['train_id'] == train_id.upper()]

        if train_data.empty:
            raise HTTPException(status_code=404, detail=f"Train {train_id} not found")

        # Convert the first matching row to a dictionary
        return train_data.iloc[0].to_dict()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Mock data file not found")