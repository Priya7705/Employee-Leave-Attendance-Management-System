from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.models.user import User
from app.database import Base, engine
from app.models.role import Role
from app.models.department import Department
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.models.leave_type import LeaveType
from app.models.leave_request import LeaveRequest
from app.models.holiday import Holiday
from app.routers.role_router import router as role_router
from app.routers.user_router import router as user_router
from app.routers.department_router import router as department_router
from app.routers.employee_router import router as employee_router
from app.routers.attendance_router import router as attendance_router
from app.routers.leave_router import router as leave_router
from app.models.payroll import Payroll
from app.routers.payroll_router import router as payroll_router
from app.routers.dashboard_router import router as dashboard_router
from app.auth.auth import router as auth_router
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Employee Leave & Attendance Management System API",
    version="1.0.0",
    description="Backend APIs for ELAMS"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to ELAMS Backend",
        "status": "Running Successfully"
    }

app.include_router(role_router)
app.include_router(user_router)
app.include_router(department_router)
app.include_router(employee_router)
app.include_router(attendance_router)
app.include_router(leave_router)
app.include_router(payroll_router)
app.include_router(auth_router)
app.include_router(dashboard_router)