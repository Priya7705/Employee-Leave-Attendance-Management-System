from fastapi import HTTPException
from app.models.employee import Employee
from sqlalchemy.orm import Session
from app.models.leave import Leave
from app.schemas.leave_schema import LeaveCreate

# Create Leave
def create_leave(db: Session, leave: LeaveCreate):
    new_leave = Leave(**leave.model_dump(),
                      status="Pending")
    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)
    return new_leave


# Bulk Create Leave
def create_bulk_leave(db: Session, leaves: list[LeaveCreate]):
    leave_objects = []

    for leave in leaves:
        leave_obj = Leave(**leave.model_dump(),
                          status="Pending")
        db.add(leave_obj)
        leave_objects.append(leave_obj)

    db.commit()

    for leave_obj in leave_objects:
        db.refresh(leave_obj)

    return {
        "success": True,
        "message": "Bulk leave records inserted successfully.",
        "records_inserted": len(leave_objects)
    }

def get_leaves(db: Session):

    records = (
        db.query(
            Leave,
            Employee.first_name,
            Employee.last_name
        )
        .join(
            Employee,
            Leave.employee_id == Employee.employee_id
        )
        .all()
    )

    return [
        {
            "leave_id": leave.leave_id,
            "employee_id": leave.employee_id,
            "employee_name": f"{first_name} {last_name}",
            "leave_type_name": leave.leave_type,
            "start_date": leave.start_date,
            "end_date": leave.end_date,
            "reason": leave.reason,
            "status": leave.status
        }

        for leave, first_name, last_name in records
    ]


# Get Leave By ID
def get_leave_by_id(db: Session, leave_id: int):
    leave = db.query(Leave).filter(Leave.leave_id == leave_id).first()

    if not leave:
        raise HTTPException(status_code=404, detail="Leave record not found")

    return leave


# Update Leave
def update_leave(db: Session, leave_id: int, leave: LeaveCreate):
    existing_leave = db.query(Leave).filter(
        Leave.leave_id == leave_id
    ).first()

    if not existing_leave:
        raise HTTPException(status_code=404, detail="Leave record not found")

    existing_leave.status = leave.status

    db.commit()
    db.refresh(existing_leave)

    return existing_leave


# Delete Leave
def delete_leave(db: Session, leave_id: int):
    leave = db.query(Leave).filter(
        Leave.leave_id == leave_id
    ).first()

    if not leave:
        raise HTTPException(status_code=404, detail="Leave record not found")

    db.delete(leave)
    db.commit()

    return {
        "message": "Leave record deleted successfully."
    }
def approve_leave(db: Session, leave_id: int):
    leave = db.query(Leave).filter(
        Leave.leave_id == leave_id
    ).first()

    if not leave:
        raise HTTPException(status_code=404, detail="Leave record not found")

    leave.status = "Approved"

    db.commit()
    db.refresh(leave)

    return leave


def reject_leave(db: Session, leave_id: int):
    leave = db.query(Leave).filter(
        Leave.leave_id == leave_id
    ).first()

    if not leave:
        raise HTTPException(status_code=404, detail="Leave record not found")

    leave.status = "Rejected"

    db.commit()
    db.refresh(leave)

    return leave


def get_my_leaves(db: Session, user_id: int):
    employee = (
        db.query(Employee)
        .filter(Employee.user_id == user_id)
        .first()
    )

    if not employee:
        return []

    return (
        db.query(Leave)
        .filter(Leave.employee_id == employee.employee_id)
        .all()
    )