import pandas as pd
from fastapi import HTTPException
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "mock_train_data.csv"

def get_ranked_trains():
    """
    Applies filtering and a placeholder ranking logic to all trains.
    """
    try:
        df = pd.read_csv(DATA_PATH)

        # 1. Filter for service-ready candidates
        candidates = df[
            (df['fitness_certificate_status'] == 'OK') &
            (df['job_card_status'] == 'Closed')
        ].copy()

        if candidates.empty:
            return []

        # 2. Apply placeholder ranking logic
        # Score based on lower mileage (better) and higher branding priority
        def calculate_score(row):
            score = 0
            # Normalize mileage score (lower mileage gets a higher score)
            min_mileage = candidates['mileage'].min()
            max_mileage = candidates['mileage'].max()
            if max_mileage > min_mileage:
                score += (1 - (row['mileage'] - min_mileage) / (max_mileage - min_mileage)) * 0.6
            
            # Add points for branding priority
            priority_map = {'High': 0.4, 'Medium': 0.2, 'Low': 0.1}
            score += priority_map.get(row['branding_priority'], 0)
            return round(score, 3)

        candidates['score'] = candidates.apply(calculate_score, axis=1)
        
        # 3. Format and sort the final list
        ranked_list = candidates[['train_id', 'score']].sort_values(by='score', ascending=False)
        return ranked_list.to_dict('records')

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Mock data file not found")