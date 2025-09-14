import pandas as pd
from fastapi import HTTPException
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "mock_train_data.csv"

def get_ranked_trains(limit=None):
    """
    Applies filtering and a placeholder ranking logic to all trains.
    
    Args:
        limit (int, optional): Number of top trains to return. If None, returns all.
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
        
        # 3. Sort by score (highest first)
        ranked_candidates = candidates.sort_values(by='score', ascending=False)
        
        # 4. Apply limit if specified
        if limit is not None and limit > 0:
            ranked_candidates = ranked_candidates.head(limit)
        
        # 5. Select all relevant columns for frontend
        result_columns = [
            'train_id', 
            'train_name', 
            'score', 
            'status', 
            'priority_level',
            'depot',
            'mileage',
            'last_maintenance_time',
            'fitness_certificate_status',
            'job_card_status'
        ]
        
        # Ensure all columns exist before selecting
        available_columns = [col for col in result_columns if col in ranked_candidates.columns]
        
        final_result = ranked_candidates[available_columns].to_dict('records')
        
        return final_result

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Mock data file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing ranked trains: {str(e)}")
