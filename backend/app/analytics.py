import pandas as pd
import numpy as np

# Constants for baseball physics
BALL_MASS = 0.145  # kg
BALL_DIAMETER = 0.073  # meters
BALL_RADIUS = BALL_DIAMETER / 2
BALL_AREA = np.pi * BALL_RADIUS ** 2  # m^2
AIR_DENSITY = 1.2  # kg/m^3 (approximate, sea level, 20°C)
GRAVITY = 9.8  # m/s^2

# Conversion factors
MPH_TO_MPS = 0.44704
FEET_TO_METERS = 0.3048


def estimate_drag_coefficient(df: pd.DataFrame) -> pd.DataFrame:
    """
    Estimate drag coefficient for each batted ball using launch_speed, launch_angle, and hit_distance_sc.
    Uses a simplified physics model and filters for plausible values.
    """
    # Only use plausible batted balls
    mask = (
        df["launch_speed"].notnull() &
        df["launch_angle"].notnull() &
        df["hit_distance_sc"].notnull() &
        (df["launch_speed"] > 60) &
        (df["hit_distance_sc"] > 50) &
        (df["launch_angle"].between(10, 45))
    )
    df = df.copy()
    df.loc[~mask, "drag_coefficient"] = np.nan
    # Convert units
    v0 = df.loc[mask, "launch_speed"] * MPH_TO_MPS  # m/s
    theta = np.deg2rad(df.loc[mask, "launch_angle"])  # radians
    d_actual = df.loc[mask, "hit_distance_sc"] * FEET_TO_METERS  # meters
    # Expected distance in vacuum (no drag)
    d_vacuum = (v0 ** 2) * np.sin(2 * theta) / GRAVITY
    # Estimate drag coefficient (Cd) using a simplified model
    with np.errstate(divide='ignore', invalid='ignore'):
        cd = (2 * BALL_MASS * GRAVITY * (d_vacuum - d_actual)) / (AIR_DENSITY * BALL_AREA * d_actual * v0 ** 2)
        # Only keep positive, plausible drag coefficients
        cd = np.where((d_actual > 0) & (v0 > 0) & (d_actual < d_vacuum) & (cd > 0) & (cd < 1), cd, np.nan)
    # Debug print for the first row
    if len(v0) > 0:
        print("--- Drag Coefficient Debug ---")
        print(f"launch_speed (mph): {df.loc[mask, 'launch_speed'].iloc[0]}")
        print(f"launch_speed (m/s): {v0.iloc[0]}")
        print(f"launch_angle (deg): {df.loc[mask, 'launch_angle'].iloc[0]}")
        print(f"launch_angle (rad): {theta.iloc[0]}")
        print(f"hit_distance_sc (ft): {df.loc[mask, 'hit_distance_sc'].iloc[0]}")
        print(f"hit_distance_sc (m): {d_actual.iloc[0]}")
        print(f"d_vacuum (m): {d_vacuum.iloc[0]}")
        print(f"BALL_MASS: {BALL_MASS}")
        print(f"GRAVITY: {GRAVITY}")
        print(f"AIR_DENSITY: {AIR_DENSITY}")
        print(f"BALL_AREA: {BALL_AREA}")
        print(f"Cd (calculated): {cd[0]}")
        print("-----------------------------")
    df.loc[mask, "drag_coefficient"] = cd
    return df


def calculate_xhr(df: pd.DataFrame) -> pd.DataFrame:
    """Calculate expected home runs (xHR) based on launch angle and exit velocity (placeholder)."""
    df["xhr"] = (df["launch_speed"] > 95) & (df["launch_angle"].between(20, 35))
    return df 