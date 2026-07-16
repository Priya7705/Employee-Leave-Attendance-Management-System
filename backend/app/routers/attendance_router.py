from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app.auth.dependencies import (
    get_current_user,
    require_hr
)
from app.schemas.attendance_schema import AttendanceCreate, AttendanceResponse
from app.services.attendance_service import (
    create_attendance,
    create_bulk_attendance,
    get_attendance,
    get_attendance_by_id,
    update_attendance,
    delete_attendance,
    get_my_attendance
)
router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=AttendanceResponse)
def add_attendance(attendance: AttendanceCreate, 
                   db: Session = Depends(get_db),
                   current_user=Depends(require_hr)):
    return create_attendance(db, attendance)

@router.post("/bulk")
def create_bulk(
    attendances: List[AttendanceCreate],
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return create_bulk_attendance(db, attendances)

@router.get("/")
def read_attendance(db: Session = Depends(get_db),
                    current_user=Depends(require_hr)):
    return get_attendance(db)

@router.get("/me", response_model=list[AttendanceResponse])
def read_my_attendance(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_my_attendance(
        db,
        current_user["user_id"]
    )

@router.get("/{attendance_id}", response_model=AttendanceResponse)
def read_attendance_by_id(attendance_id: int, db: Session = Depends(get_db),current_user=Depends(require_hr)):
    return get_attendance_by_id(db, attendance_id)



@router.put("/{attendance_id}", response_model=AttendanceResponse)
def edit_attendance(
    attendance_id: int,
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):
    return update_attendance(db, attendance_id, attendance)


@router.delete("/{attendance_id}")
def remove_attendance(attendance_id: int, 
                      db: Session = Depends(get_db),
                      current_user=Depends(require_hr)):
    return delete_attendance(db, attendance_id)