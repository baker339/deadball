import pandas as pd
from fastapi import APIRouter, Query, Request
from datetime import datetime, date
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from ..models import StatcastEvent, engine
import numpy as np

router = APIRouter()

@router.get("/aggregates")
def get_aggregates():
    return {"data": "Aggregates endpoint placeholder"}

@router.get("/exit_velocity_distance")
def get_exit_velocity_distance(
    request: Request,
    start_date: str = Query("2015-01-01", description="Start date in YYYY-MM-DD format"),
    end_date: str = Query(None, description="End date in YYYY-MM-DD format (defaults to today)")
):
    cache = request.app.state.CACHE
    # Serve from cache if available and using default params
    if start_date == "2015-01-01" and (end_date is None or end_date == date.today().strftime("%Y-%m-%d")) and "exit_velocity_distance" in cache:
        return {"data": cache["exit_velocity_distance"]}
    try:
        if end_date is None:
            end_date = date.today().strftime("%Y-%m-%d")
        start_dt = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_dt = datetime.strptime(end_date, "%Y-%m-%d").date()

        with Session(engine) as session:
            query = session.query(
                StatcastEvent.game_date,
                StatcastEvent.launch_speed,
                StatcastEvent.launch_angle,
                StatcastEvent.hit_distance_sc,
                StatcastEvent.bb_type,
                StatcastEvent.drag_coefficient
            ).filter(
                StatcastEvent.game_date >= start_dt,
                StatcastEvent.game_date <= end_dt,
                StatcastEvent.launch_speed != None,
                StatcastEvent.launch_angle != None,
                StatcastEvent.hit_distance_sc != None,
                StatcastEvent.bb_type != None,
                StatcastEvent.drag_coefficient.isnot(None)
            )
            df = pd.read_sql(query.statement, session.bind)

        if df.empty:
            return {"data": []}

        # Drop any rows where drag_coefficient is null or NaN (defensive)
        df = df[df["drag_coefficient"].notnull()]

        # Replace NaN, inf, -inf with None for JSON serialization
        df = df.replace([np.nan, np.inf, -np.inf], None)

        # Return all batted balls as list of dicts
        return {"data": df.to_dict(orient="records")}
    except Exception as e:
        import traceback
        print("Error in /exit_velocity_distance:", e)
        traceback.print_exc()
        return {"error": str(e)}, 500

@router.get("/timeline")
def get_timeline():
    return {"data": "Timeline endpoint placeholder"}

@router.get("/trig_explorer")
def get_trig_explorer():
    return {"data": "Trig explorer endpoint placeholder"}

@router.get("/drag_vs_hr")
def get_drag_vs_hr(
    request: Request,
    start_date: str = Query("2015-01-01", description="Start date in YYYY-MM-DD format"),
    end_date: str = Query(None, description="End date in YYYY-MM-DD format (defaults to today)"),
    granularity: str = Query("month", description="Grouping: year, month, week, or day")
):
    cache = request.app.state.CACHE
    # Serve from cache if available and using default params
    if start_date == "2015-01-01" and (end_date is None or end_date == date.today().strftime("%Y-%m-%d")) and granularity == "month" and "drag_vs_hr" in cache:
        return {"data": cache["drag_vs_hr"]}
    # Use today's date if no end_date provided
    if end_date is None:
        end_date = date.today().strftime("%Y-%m-%d")
    
    # Parse dates
    start_dt = datetime.strptime(start_date, "%Y-%m-%d").date()
    end_dt = datetime.strptime(end_date, "%Y-%m-%d").date()

    with Session(engine) as session:
        query = session.query(
            StatcastEvent.game_date,
            StatcastEvent.drag_coefficient,
            StatcastEvent.events,
            StatcastEvent.bb_type
        ).filter(
            StatcastEvent.game_date >= start_dt,
            StatcastEvent.game_date <= end_dt,
            StatcastEvent.drag_coefficient != None,
            StatcastEvent.drag_coefficient > 0.1,
            StatcastEvent.drag_coefficient < 0.6,
            (
                (StatcastEvent.bb_type.in_(["fly_ball", "line_drive"])) |
                (StatcastEvent.events == "home_run")
            )
        )
        df = pd.read_sql(query.statement, session.bind)

    if df.empty:
        return {"data": []}

    # Add period column based on granularity
    date_col = pd.to_datetime(df["game_date"])
    if granularity == "year":
        df["period"] = date_col.dt.to_period("Y").astype(str)
    elif granularity == "month":
        df["period"] = date_col.dt.to_period("M").astype(str)
    elif granularity == "day":
        df["period"] = date_col.dt.date
    else:  # default to week
        df["period"] = date_col.dt.to_period("W").astype(str)

    grouped = df.groupby("period").agg(
        drag_coefficient=("drag_coefficient", "mean"),
        home_runs=("events", lambda x: (x == "home_run").sum())
    ).reset_index().rename(columns={"period": granularity})
    return {"data": grouped.to_dict(orient="records")} 

@router.get("/expected_vs_actual_distance")
def get_expected_vs_actual_distance(
    start_date: str = Query("2015-01-01", description="Start date in YYYY-MM-DD format"),
    end_date: str = Query(None, description="End date in YYYY-MM-DD format (defaults to today)")
):
    # Physics constants
    GRAVITY = 9.8  # m/s^2
    MPH_TO_MPS = 0.44704
    FEET_TO_METERS = 0.3048

    # Use today's date if no end_date provided
    if end_date is None:
        end_date = date.today().strftime("%Y-%m-%d")
    start_dt = datetime.strptime(start_date, "%Y-%m-%d").date()
    end_dt = datetime.strptime(end_date, "%Y-%m-%d").date()

    with Session(engine) as session:
        query = session.query(
            StatcastEvent.game_date,
            StatcastEvent.launch_speed,
            StatcastEvent.launch_angle,
            StatcastEvent.hit_distance_sc
        ).filter(
            StatcastEvent.game_date >= start_dt,
            StatcastEvent.game_date <= end_dt,
            StatcastEvent.launch_speed > 60,
            StatcastEvent.hit_distance_sc > 50,
            StatcastEvent.launch_angle >= 10,
            StatcastEvent.launch_angle <= 45,
            StatcastEvent.launch_speed != None,
            StatcastEvent.launch_angle != None,
            StatcastEvent.hit_distance_sc != None
        )
        df = pd.read_sql(query.statement, session.bind)

    if df.empty:
        return {"data": []}

    # Calculate expected distance in vacuum
    v0 = df["launch_speed"] * MPH_TO_MPS  # m/s
    theta = np.deg2rad(df["launch_angle"])  # radians
    d_vacuum = (v0 ** 2) * np.sin(2 * theta) / GRAVITY  # meters
    df["expected_distance"] = d_vacuum / FEET_TO_METERS  # convert to feet

    # Return all hits as list of dicts
    return {"data": df.to_dict(orient="records")} 

@router.get("/drag_coefficient_stats")
def get_drag_coefficient_stats():
    import numpy as np
    with Session(engine) as session:
        query = session.query(StatcastEvent.drag_coefficient).filter(StatcastEvent.drag_coefficient != None)
        df = pd.read_sql(query.statement, session.bind)
    # Drop NaN
    df = df[df["drag_coefficient"].notnull()]
    if df.empty:
        return {"min": None, "max": None, "mean": None, "median": None, "count": 0}
    values = df["drag_coefficient"].astype(float).values
    stats = {
        "min": float(np.min(values)),
        "max": float(np.max(values)),
        "mean": float(np.mean(values)),
        "median": float(np.median(values)),
        "count": int(len(values)),
    }
    return stats 

@router.get("/pitch_vs_exit_velocity")
def get_pitch_vs_exit_velocity(
    start_date: str = Query("2015-01-01", description="Start date in YYYY-MM-DD format"),
    end_date: str = Query(None, description="End date in YYYY-MM-DD format (defaults to today)"),
    pitch_type: str = Query(None, description="Comma-separated pitch types (e.g. 'FF,SL')"),
    bb_type: str = Query(None, description="Comma-separated batted ball types (e.g. 'fly_ball,line_drive')"),
    min_release_speed: float = Query(30, description="Minimum pitch velocity (mph)"),
    max_release_speed: float = Query(110, description="Maximum pitch velocity (mph)"),
    min_launch_speed: float = Query(40, description="Minimum exit velocity (mph)"),
    max_launch_speed: float = Query(130, description="Maximum exit velocity (mph)")
):
    if end_date is None:
        end_date = date.today().strftime("%Y-%m-%d")
    start_dt = datetime.strptime(start_date, "%Y-%m-%d").date()
    end_dt = datetime.strptime(end_date, "%Y-%m-%d").date()
    with Session(engine) as session:
        query = session.query(
            StatcastEvent.release_speed,
            StatcastEvent.launch_speed,
            StatcastEvent.bb_type,
            StatcastEvent.events,
            StatcastEvent.pitch_type,
            StatcastEvent.game_date
        ).filter(
            StatcastEvent.release_speed != None,
            StatcastEvent.launch_speed != None,
            StatcastEvent.game_date >= start_dt,
            StatcastEvent.game_date <= end_dt,
            StatcastEvent.release_speed >= min_release_speed,
            StatcastEvent.release_speed <= max_release_speed,
            StatcastEvent.launch_speed >= min_launch_speed,
            StatcastEvent.launch_speed <= max_launch_speed
        )
        # Pitch type filter
        if pitch_type:
            types = [pt.strip() for pt in pitch_type.split(",") if pt.strip()]
            if types:
                query = query.filter(StatcastEvent.pitch_type.in_(types))
        # Batted ball type filter
        if bb_type:
            bb_types = [bt.strip() for bt in bb_type.split(",") if bt.strip()]
            if bb_types:
                query = query.filter(StatcastEvent.bb_type.in_(bb_types))
        else:
            # Default: fly_ball, line_drive, or home_run
            query = query.filter(
                (StatcastEvent.bb_type.in_(["fly_ball", "line_drive"])) |
                (StatcastEvent.events == "home_run")
            )
        df = pd.read_sql(query.statement, session.bind)
    # Drop NaN
    df = df[df["release_speed"].notnull() & df["launch_speed"].notnull()]
    return {"data": df.to_dict(orient="records")} 