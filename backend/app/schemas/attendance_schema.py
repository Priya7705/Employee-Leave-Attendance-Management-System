from pydantic import BaseModel
from datetime import date, time, datetime


class AttendanceCreate(BaseModel):
    employee_id: int
    attendance_date: date
    check_in: time | None = None 
    check_out: time | None = None
    status: str


class AttendanceResponse(BaseModel):
    attendance_id: int
    employee_id: int
    attendance_date: date
    check_in: time | None
    check_out: time | None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True