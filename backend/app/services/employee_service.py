from sqlalchemy.orm import Session
from app.models.employee import Employee
from app.schemas.employee_schema import EmployeeCreate


def create_employee(db: Session, employee: EmployeeCreate):
    new_employee = Employee(
        user_id=employee.user_id,
        department_id=employee.department_id,
        employee_code=employee.employee_code,
        first_name=employee.first_name,
        last_name=employee.last_name,
        phone=employee.phone,
        designation=employee.designation,
        joining_date=employee.joining_date,
        status=employee.status
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


def get_employees(db: Session):
    return db.query(Employee).all()


def get_employee(db: Session, employee_id: int):
    return db.query(Employee).filter(Employee.employee_id == employee_id).first()


def update_employee(db: Session, employee_id: int, employee: EmployeeCreate):
    existing_employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()

    if existing_employee:
        existing_employee.user_id = employee.user_id
        existing_employee.department_id = employee.department_id
        existing_employee.employee_code = employee.employee_code
        existing_employee.first_name = employee.first_name
        existing_employee.last_name = employee.last_name
        existing_employee.phone = employee.phone
        existing_employee.designation = employee.designation
        existing_employee.joining_date = employee.joining_date
        existing_employee.status = employee.status

        db.commit()
        db.refresh(existing_employee)

    return existing_employee


def delete_employee(db: Session, employee_id: int):
    existing_employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()

    if existing_employee:
        db.delete(existing_employee)
        db.commit()

    return {"message": "Employee deleted successfully"}
def get_my_profile(db: Session, user_id: int):
    return (
        db.query(Employee)
        .filter(Employee.user_id == user_id)
        .first()
    )
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