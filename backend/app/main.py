from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import endpoints

app = FastAPI(title="Deadball Tracker API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://deadball-hhfp.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.CACHE = {}

def refresh_cache():
    from .api.endpoints import get_exit_velocity_distance, get_drag_vs_hr
    app.state.CACHE["exit_velocity_distance"] = get_exit_velocity_distance.__wrapped__()["data"]
    app.state.CACHE["drag_vs_hr"] = get_drag_vs_hr.__wrapped__()["data"]
    # Add more as needed

@app.on_event("startup")
def load_data():
    refresh_cache()

@app.get("/refresh_cache")
def refresh_cache_endpoint():
    refresh_cache()
    return {"status": "Cache refreshed"}

app.include_router(endpoints.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Deadball Tracker API!"} 