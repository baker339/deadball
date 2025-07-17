from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import endpoints

app = FastAPI(title="Deadball Tracker API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Deadball Tracker API!"} 