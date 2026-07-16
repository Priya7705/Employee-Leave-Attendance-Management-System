from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.dependencies import require_hr
from app.database import SessionLocal
from app.schemas.department_schema import (
    DepartmentCreate,
    DepartmentResponse
)
from app.services.department_service import (
    create_department,
    get_departments,
    get_department,
    update_department,
    delete_department
)

router = APIRouter(
    prefix="/departments",
    tags=["Departments"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=DepartmentResponse)
def add_department(
    department: DepartmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return create_department(db, department)


@router.get("/", response_model=list[DepartmentResponse])
def read_departments(db: Session = Depends(get_db),current_user=Depends(require_hr)):
    return get_departments(db)


@router.get("/{department_id}", response_model=DepartmentResponse)
def read_department(
    department_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return get_department(db, department_id)


@router.put("/{department_id}", response_model=DepartmentResponse)
def edit_department(
    department_id: int,
    department: DepartmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return update_department(db, department_id, department)


@router.delete("/{department_id}")
def remove_department(
    department_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return delete_department(db, department_id)