from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.dependencies import (
    get_current_user,
    require_hr
)
from app.database import SessionLocal
from app.schemas.employee_schema import EmployeeCreate, EmployeeResponse
from app.services.employee_service import (
    create_employee,
    get_employees,
    get_employee,
    update_employee,
    delete_employee,
    get_my_profile
)

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=EmployeeResponse)
def add_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return create_employee(db, employee)


@router.get("/", response_model=list[EmployeeResponse])
def read_employees(
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return get_employees(db)

@router.get("/me", response_model=EmployeeResponse)
def read_my_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_my_profile(
        db,
        current_user["user_id"]
    )

@router.get("/me", response_model=EmployeeResponse)
def my_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    employee = db.query(Employee).filter(
        Employee.user_id == current_user.user_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee

@router.get("/{employee_id}", response_model=EmployeeResponse)
def read_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return get_employee(db, employee_id)


@router.put("/{employee_id}", response_model=EmployeeResponse)
def edit_employee(
    employee_id: int,
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return update_employee(db, employee_id, employee)

@router.delete("/{employee_id}")
def remove_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return delete_employee(db, employee_id)

