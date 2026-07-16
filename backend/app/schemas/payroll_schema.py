from pydantic import BaseModel
from datetime import date, datetime


class PayrollCreate(BaseModel):
    employee_id: int
    pay_month: date
    basic_salary: float
    allowances: float = 0
    deductions: float = 0
    payment_date: date


class PayrollResponse(BaseModel):
    payroll_id: int
    employee_id: int
    pay_month: date
    basic_salary: float
    allowances: float
    deductions: float
    net_salary: float
    payment_date: date
    created_at: datetime

    class Config:
        from_attributes = True