from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.attendance import Attendance
from app.models.leave_request import LeaveRequest


def get_dashboard_stats(db: Session):

    total_employees = db.query(Employee).count()

    present_today = (
        db.query(Attendance)
        .filter(
            Attendance.status == "Present"
        )
        .count()
    )

    pending_leaves = (
        db.query(LeaveRequest)
        .filter(
            LeaveRequest.status == "Pending"
        )
        .count()
    )

    return {

        "total_employees": total_employees,

        "present_today": present_today,

        "pending_leaves": pending_leaves

    }