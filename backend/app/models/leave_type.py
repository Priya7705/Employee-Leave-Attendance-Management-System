from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base


class LeaveType(Base):
    __tablename__ = "leave_types"

    leave_type_id = Column(Integer, primary_key=True, index=True)
    leave_name = Column(String(100), unique=True, nullable=False)
    max_days = Column(Integer, nullable=False)
    description = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)