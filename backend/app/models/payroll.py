from sqlalchemy import Column, Integer, Float, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Payroll(Base):
    __tablename__ = "payroll"

    payroll_id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(
        Integer,
        ForeignKey("employees.employee_id"),
        nullable=False
    )

    pay_month = Column(Date, nullable=False)

    basic_salary = Column(Float, nullable=False)
    allowances = Column(Float, default=0)
    deductions = Column(Float, default=0)

    net_salary = Column(Float, nullable=False)

    payment_date = Column(Date, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("Employee", back_populates="payroll")