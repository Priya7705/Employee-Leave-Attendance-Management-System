from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.auth.dependencies import (
    get_current_user,
    require_hr
)
from app.schemas.payroll_schema import PayrollCreate, PayrollResponse
from app.services.payroll_service import (
    create_payroll,
    create_bulk_payroll,
    get_payrolls,
    get_payroll_by_id,
    update_payroll,
    delete_payroll,
    get_my_payroll
)

router = APIRouter(
    prefix="/payroll",
    tags=["Payroll"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=PayrollResponse)
def add_payroll(
    payroll: PayrollCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return create_payroll(db, payroll)


@router.post("/bulk")
def add_bulk_payroll(
    payrolls: List[PayrollCreate],
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return create_bulk_payroll(db, payrolls)


@router.get("/", response_model=list[PayrollResponse])
def read_payrolls(db: Session = Depends(get_db),current_user=Depends(require_hr)):
    return get_payrolls(db)


@router.get("/me", response_model=list[PayrollResponse])
def read_my_payroll(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_my_payroll(
        db,
        current_user["user_id"]
    )

@router.get("/{payroll_id}", response_model=PayrollResponse)
def read_payroll_by_id(
    payroll_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return get_payroll_by_id(db, payroll_id)


@router.put("/{payroll_id}", response_model=PayrollResponse)
def edit_payroll(
    payroll_id: int,
    payroll: PayrollCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return update_payroll(db, payroll_id, payroll)


@router.delete("/{payroll_id}")
def remove_payroll(
    payroll_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return delete_payroll(db, payroll_id)