from sqlalchemy import Column, Integer, String, Date, DateTime
from datetime import datetime
from app.database import Base


class Holiday(Base):
    __tablename__ = "holidays"

    holiday_id = Column(Integer, primary_key=True, index=True)
    holiday_name = Column(String(100), nullable=False)
    holiday_date = Column(Date, nullable=False)
    description = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)