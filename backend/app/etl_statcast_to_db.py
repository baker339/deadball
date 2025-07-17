import pandas as pd
from datetime import datetime
from sqlalchemy.orm import Session
from app.models import StatcastEvent, engine, Base
from app.analytics import estimate_drag_coefficient
from app.data_ingest import fetch_statcast_data

# Define the columns to keep
COLUMNS_TO_KEEP = [
    'game_date', 'events', 'launch_speed', 'launch_angle', 'hit_distance_sc',
    'pitch_type', 'release_speed', 'hc_x', 'hc_y', 'bb_type', 'home_team', 'stadium'
]

# For testing: Only fetch all of 2015
START_DATE = "2025-01-01"
END_DATE = "2025-7-15"

if __name__ == "__main__":
    print(f"Fetching Statcast data from {START_DATE} to {END_DATE}...")
    df = fetch_statcast_data(START_DATE, END_DATE)
    if df.empty:
        print("No data fetched.")
        exit(1)
    print(f"Fetched {len(df)} rows.")

    # Only keep relevant columns (if present)
    available_cols = [col for col in COLUMNS_TO_KEEP if col in df.columns]
    df = df[available_cols]

    # Only keep batted balls (i.e., rows with a bb_type)
    df = df[df['bb_type'].notnull()]

    # Calculate drag coefficient
    df = estimate_drag_coefficient(df)

    # Fill missing columns with None
    for col in COLUMNS_TO_KEEP + ['drag_coefficient']:
        if col not in df.columns:
            df[col] = None

    # Convert game_date to datetime.date
    df['game_date'] = pd.to_datetime(df['game_date']).dt.date

    # Prepare records for insertion
    records = df.to_dict(orient='records')

    # Insert into DB (bulk insert for speed)
    print(f"Inserting {len(records)} records into the database (bulk insert)...")
    Base.metadata.create_all(engine)
    with Session(engine) as session:
        session.bulk_insert_mappings(StatcastEvent, records)
        session.commit()
    print("Done!") 