from pydantic import BaseModel
from datetime import date, datetime


class LeaveCreate(BaseModel):
    employee_id: int
    leave_type: str
    start_date: date
    end_date: date
    reason: str
    


class LeaveResponse(BaseModel):
    leave_id: int
    employee_id: int
    leave_type: str
    start_date: date
    end_date: date
    reason: str
    status: str
    applied_on: datetime

    class Config:
        from_attributes = True
class LeaveStatusUpdate(BaseModel):
    status: str