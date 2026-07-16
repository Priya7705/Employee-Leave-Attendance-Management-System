from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.models.employee import Employee
from app.auth.dependencies import (
    get_current_user,
    require_hr
)
from app.database import SessionLocal
from app.schemas.leave_schema import LeaveCreate, LeaveResponse,LeaveStatusUpdate
from app.services.leave_service import (
    create_leave,
    create_bulk_leave,
    get_leaves,
    get_leave_by_id,
    update_leave,
    delete_leave,
    approve_leave,
    reject_leave,
    get_my_leaves
)

router = APIRouter(
    prefix="/leave",
    tags=["Leave"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=LeaveResponse)
def add_leave(leave: LeaveCreate, db: Session = Depends(get_db),current_user=Depends(get_current_user)):
    return create_leave(db, leave)


@router.post("/bulk")
def add_bulk_leave(
    leaves: List[LeaveCreate],
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return create_bulk_leave(db, leaves)


@router.get("/")
def read_leaves(db: Session = Depends(get_db),current_user=Depends(require_hr)):
    return get_leaves(db)
@router.get("/my")
def my_leaves(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    employee = db.query(Employee).filter(
        Employee.user_id == current_user.user_id
    ).first()


    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee record not found"
        )


    return db.query(Leave).filter(
        Leave.employee_id == employee.employee_id
    ).all()

@router.get("/me", response_model=list[LeaveResponse])
def read_my_leaves(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_my_leaves(
        db,
        current_user["user_id"]
    )

@router.get("/{leave_id}", response_model=LeaveResponse)
def read_leave_by_id(leave_id: int, db: Session = Depends(get_db),current_user=Depends(require_hr)):
    return get_leave_by_id(db, leave_id)


@router.put("/{leave_id}", response_model=LeaveResponse)
def edit_leave(
    leave_id: int,
    leave:LeaveStatusUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return update_leave(db, leave_id, leave)

@router.put("/{leave_id}/approve", response_model=LeaveResponse)
def approve_leave_request(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return approve_leave(db, leave_id)


@router.put("/{leave_id}/reject", response_model=LeaveResponse)
def reject_leave_request(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return reject_leave(db, leave_id)

@router.delete("/{leave_id}")
def remove_leave(
    leave_id: int,
    db: Session = Depends(get_db),current_user=Depends(require_hr)
):
    return delete_leave(db, leave_id)