import os
from sqlalchemy import create_engine, Column, Integer, Float, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class StatcastEvent(Base):
    __tablename__ = "statcast_events"
    id = Column(Integer, primary_key=True, index=True)
    game_date = Column(Date)
    events = Column(String)
    launch_speed = Column(Float)
    launch_angle = Column(Float)
    hit_distance_sc = Column(Float)
    drag_coefficient = Column(Float)
    pitch_type = Column(String)
    release_speed = Column(Float)
    hc_x = Column(Float)
    hc_y = Column(Float)
    bb_type = Column(String)
    home_team = Column(String)
    stadium = Column(String) 