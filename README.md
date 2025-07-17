# Deadball Tracker

A full-stack web application for analyzing MLB Statcast data, focusing on batted balls and the evolution of baseball construction ("juiced" vs. "dead" ball debate).

## Tech Stack

- **Frontend:** Next.js (TypeScript), Tailwind CSS, D3.js
- **Backend:** FastAPI (Python), pybaseball, pandas, scikit-learn, PostgreSQL
- **Data Storage:** PostgreSQL

## Monorepo Structure

```
backend/   # FastAPI app, data pipeline, analytics
frontend/  # Next.js app, charts, UI
shared/    # (optional) shared types, docs
```

## Setup Instructions

### Backend
1. `cd backend`
2. Create a Python virtual environment: `python3 -m venv venv && source venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Set up PostgreSQL and update connection string in `backend/app/main.py`
5. Run the FastAPI server: `uvicorn app.main:app --reload`

### Frontend
1. `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

---

For more details, see the `backend/README.md` and `frontend/README.md` files. 