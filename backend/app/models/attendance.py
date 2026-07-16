from sqlalchemy import Column, Integer, String, Date, Time, DateTime, ForeignKey
from datetime import datetime
from app.database import Base
from sqlalchemy.orm import relationship


class Attendance(Base):
    __tablename__ = "attendance"

    attendance_id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.employee_id"), nullable=False)

    attendance_date = Column(Date, nullable=False)
    check_in = Column(Time)
    check_out = Column(Time)

    status = Column(String(20), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    
    employee = relationship("Employee", back_populates="attendance")