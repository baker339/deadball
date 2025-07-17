from pybaseball import statcast
import pandas as pd

def fetch_statcast_data(start_date: str, end_date: str) -> pd.DataFrame:
    """Fetch Statcast data for the given date range."""
    try:
        data = statcast(start_dt=start_date, end_dt=end_date)
        if data is None or data.empty:
            return pd.DataFrame()
        return data
    except Exception as e:
        print(f"Error fetching Statcast data: {e}")
        return pd.DataFrame()

if __name__ == "__main__":
    # Example: fetch April 2023 data
    df = fetch_statcast_data("2023-04-01", "2023-04-30")
    print(df.head()) 