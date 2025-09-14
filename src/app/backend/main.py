from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import trains, ranking, explanation

app = FastAPI(
    title="Kochi Metro Train Induction API",
    description="API for ranking and selecting trains for daily service.",
    version="0.1.0",
)

# Updated CORS configuration - more permissive for development
origins = [
    "http://localhost",
    "http://localhost:3000",  # React default
    "http://localhost:5173",  # Vite default
    "http://localhost:8080",  # Vue default
    "http://127.0.0.1:3000",  # Alternative localhost
    "http://127.0.0.1:5173",  # Alternative localhost for Vite
    "http://127.0.0.1:5500",  # VS Code Live Server
    # Add any other origins your frontend might use
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Explicitly include OPTIONS
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