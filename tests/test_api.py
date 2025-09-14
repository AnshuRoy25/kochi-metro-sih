import pytest
from httpx import AsyncClient, ASGITransport
from app.backend.main import app


@pytest.mark.asyncio
async def test_features_endpoint():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.get("/features/T01")
    assert response.status_code == 200
    data = response.json()
    assert "train_id" in data
    assert data["train_id"] == "T01"


@pytest.mark.asyncio
async def test_rank_endpoint():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.get("/rank")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert "train_id" in data[0]
    assert "score" in data[0]


@pytest.mark.asyncio
async def test_explanation_endpoint():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.get("/explanation/T01")
    assert response.status_code == 200
    data = response.json()
    assert "fitness" in data["breakdown"]
    assert "maintenance" in data["breakdown"]
    assert "branding" in data["breakdown"]


@pytest.mark.asyncio
async def test_cors_headers():
    """Check that CORS middleware is applied."""
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        response = await ac.options(
            "/features/T01",
            headers={
                "Origin": "http://localhost:3000",
                "Access-Control-Request-Method": "GET",
            },
        )
    assert response.headers.get("access-control-allow-origin") == "http://localhost:3000"
