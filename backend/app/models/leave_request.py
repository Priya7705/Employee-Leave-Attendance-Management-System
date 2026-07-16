from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from datetime import datetime
from app.database import Base


class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    leave_request_id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(Integer, ForeignKey("employees.employee_id"), nullable=False)
    leave_type_id = Column(Integer, ForeignKey("leave_types.leave_type_id"), nullable=False)

    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

    reason = Column(String(500))

    status = Column(String(20), default="Pending")

    manager_comments = Column(String(500))

    created_at = Column(DateTime, default=datetime.utcnow)