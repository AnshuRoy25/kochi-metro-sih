def get_train_explanation(train_id: str):
    """
    Returns a dummy, static explanation for a given train.
    This will be replaced by model-driven explanations later.
    """
    return {
        "train_id": train_id.upper(),
        "summary": "This train is ranked high due to its excellent fitness status and low mileage.",
        "breakdown": {
            "fitness": {
                "status": "OK",
                "reason": "All certificates (Rolling-Stock, Signalling, Telecom) are valid.",
                "expires_in": "45 days"
            },
            "maintenance": {
                "job_card_status": "Closed",
                "reason": "No outstanding work orders in IBM Maximo."
            },
            "branding": {
                "priority": "High",
                "reason": "Contractual obligation with Advertiser X requires high visibility."
            }
        }
    }