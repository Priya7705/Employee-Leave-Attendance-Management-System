from pydantic import BaseModel
from datetime import date


class EmployeeCreate(BaseModel):
    user_id: int
    department_id: int
    employee_code: str
    first_name: str
    last_name: str
    phone: str
    designation: str
    joining_date: date
    status: str = "Active"


class EmployeeResponse(BaseModel):
    employee_id: int
    user_id: int
    department_id: int
    employee_code: str
    first_name: str
    last_name: str
    phone: str
    designation: str
    joining_date: date
    status: str

    class Config:
        from_attributes = True