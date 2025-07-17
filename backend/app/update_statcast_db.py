import pandas as pd
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models import StatcastEvent, engine, Base
from app.analytics import estimate_drag_coefficient
from app.data_ingest import fetch_statcast_data

COLUMNS_TO_KEEP = [
    'game_date', 'events', 'launch_speed', 'launch_angle', 'hit_distance_sc',
    'pitch_type', 'release_speed', 'hc_x', 'hc_y', 'bb_type', 'home_team', 'stadium'
]

START_DATE = "2015-01-01"
END_DATE = datetime.today().strftime("%Y-%m-%d")

def get_latest_game_date():
    with Session(engine) as session:
        latest = session.query(func.max(StatcastEvent.game_date)).scalar()
        return latest

if __name__ == "__main__":
    latest_date = get_latest_game_date()
    if latest_date is None:
        start_date = START_DATE
    else:
        start_date = (latest_date + timedelta(days=1)).strftime("%Y-%m-%d")
    end_date = END_DATE

    print(f"Latest date in DB: {latest_date}")
    print(f"Fetching Statcast data from {start_date} to {end_date}...")

    if start_date > end_date:
        print("Database is already up to date!")
        exit(0)

    df = fetch_statcast_data(start_date, end_date)
    if df.empty:
        print("No new data fetched.")
        exit(0)
    print(f"Fetched {len(df)} new rows.")

    available_cols = [col for col in COLUMNS_TO_KEEP if col in df.columns]
    df = df[available_cols]
    df = estimate_drag_coefficient(df)
    for col in COLUMNS_TO_KEEP + ['drag_coefficient']:
        if col not in df.columns:
            df[col] = None
    df['game_date'] = pd.to_datetime(df['game_date']).dt.date
    records = df.to_dict(orient='records')

    print(f"Inserting {len(records)} new records into the database...")
    Base.metadata.create_all(engine)
    with Session(engine) as session:
        for rec in records:
            exists = session.query(StatcastEvent).filter_by(
                game_date=rec['game_date'],
                launch_speed=rec['launch_speed'],
                launch_angle=rec['launch_angle'],
                hit_distance_sc=rec['hit_distance_sc']
            ).first()
            if not exists:
                event = StatcastEvent(**rec)
                session.add(event)
        session.commit()
    print("Done!") 