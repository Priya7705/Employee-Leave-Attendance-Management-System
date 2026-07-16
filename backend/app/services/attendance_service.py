from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.schemas.attendance_schema import AttendanceCreate


# Create Attendance
def create_attendance(db: Session, attendance: AttendanceCreate):
    db_attendance = Attendance(
        employee_id=attendance.employee_id,
        attendance_date=attendance.attendance_date,
        check_in=attendance.check_in,
        check_out=attendance.check_out,
        status=attendance.status
    )

    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)

    return db_attendance


# Bulk Create Attendance
def create_bulk_attendance(db: Session, attendances: List[AttendanceCreate]):
    attendance_list = []

    for attendance in attendances:
        db_attendance = Attendance(
            employee_id=attendance.employee_id,
            attendance_date=attendance.attendance_date,
            check_in=attendance.check_in,
            check_out=attendance.check_out,
            status=attendance.status
        )
        attendance_list.append(db_attendance)

    db.add_all(attendance_list)
    db.commit()

    return attendance_list


# Get All Attendance
def get_attendance(db: Session):

    records = (
        db.query(
            Attendance,
            Employee.first_name,
            Employee.last_name
        )
        .join(
            Employee,
            Attendance.employee_id == Employee.employee_id
        )
        .all()
    )

    return [
        {
            "attendance_id": attendance.attendance_id,
            "employee_id": attendance.employee_id,
            "employee_name": f"{first_name} {last_name}",
            "attendance_date": attendance.attendance_date,
            "check_in": attendance.check_in,
            "check_out": attendance.check_out,
            "status": attendance.status,
        }
        for attendance, first_name, last_name in records
    ]
# Get Attendance By ID
def get_attendance_by_id(db: Session, attendance_id: int):
    attendance = db.query(Attendance).filter(
        Attendance.attendance_id == attendance_id
    ).first()

    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")

    return attendance


# Update Attendance
def update_attendance(
    db: Session,
    attendance_id: int,
    attendance: AttendanceCreate
):
    db_attendance = db.query(Attendance).filter(
        Attendance.attendance_id == attendance_id
    ).first()

    if not db_attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")

    db_attendance.employee_id = attendance.employee_id
    db_attendance.attendance_date = attendance.attendance_date
    db_attendance.check_in = attendance.check_in
    db_attendance.check_out = attendance.check_out
    db_attendance.status = attendance.status

    db.commit()
    db.refresh(db_attendance)

    return db_attendance


# Delete Attendance
def delete_attendance(db: Session, attendance_id: int):
    db_attendance = db.query(Attendance).filter(
        Attendance.attendance_id == attendance_id
    ).first()

    if not db_attendance:
        raise HTTPException(status_code=404, detail="Attendance not found")

    db.delete(db_attendance)
    db.commit()

    return {"message": "Attendance deleted successfully"}
def get_my_attendance(db: Session, user_id: int):
    employee = (
        db.query(Employee)
        .filter(Employee.user_id == user_id)
        .first()
    )

    if not employee:
        return []

    return (
        db.query(Attendance)
        .filter(
            Attendance.employee_id == employee.employee_id
        )
        .all()
    )