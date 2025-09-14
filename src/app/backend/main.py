from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import trains, ranking, explanation

app = FastAPI(
    title="Kochi Metro Train Induction API",
    description="API for ranking and selecting trains for daily service.",
    version="0.1.0",
)

# Configure CORS to allow frontend access during development
origins = [
    "http://localhost",
    "http://localhost:3000", # Common for React
    "http://localhost:8080", # Common for Vue
    "http://127.0.0.1:5500", # Common for VS Code Live Server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API routers
app.include_router(trains.router)
app.include_router(ranking.router)
app.include_router(explanation.router)


@app.get("/", tags=["Root"])
async def read_root():
    """A simple health check endpoint."""
    return {"status": "OK", "message": "Welcome to the Kochi Metro Train Induction API!"}