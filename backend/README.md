# Backend (FastAPI)

## Setup

1. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up PostgreSQL and update the connection string in `app/models.py` or your config.
4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Project Structure
- `app/main.py`: FastAPI app entrypoint
- `app/api/endpoints.py`: API endpoints
- `app/data_ingest.py`: Data ingestion pipeline (to be implemented)
- `app/models.py`: Database models (to be implemented)
- `app/analytics.py`: Analytics functions (to be implemented) 