from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from datetime import datetime
from app.database import Base
from sqlalchemy.orm import relationship

class Employee(Base):
    __tablename__ = "employees"

    employee_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.department_id"), nullable=False)
    

    employee_code = Column(String(20), unique=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone = Column(String(15), unique=True)
    designation = Column(String(100), nullable=False)
    joining_date = Column(Date, nullable=False)
    status = Column(String(20), default="Active")
    payroll = relationship("Payroll", back_populates="employee")
    created_at = Column(DateTime, default=datetime.utcnow)
    attendance = relationship("Attendance", back_populates="employee")