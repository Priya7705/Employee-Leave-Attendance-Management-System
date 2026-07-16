from sqlalchemy.orm import Session
from app.models.department import Department
from app.schemas.department_schema import DepartmentCreate


def create_department(db: Session, department: DepartmentCreate):
    new_department = Department(
        department_name=department.department_name,
        description=department.description
    )

    db.add(new_department)
    db.commit()
    db.refresh(new_department)

    return new_department


def get_departments(db: Session):
    return db.query(Department).all()


def get_department(db: Session, department_id: int):
    return db.query(Department).filter(
        Department.department_id == department_id
    ).first()


def update_department(db: Session, department_id: int, department: DepartmentCreate):

    existing_department = db.query(Department).filter(
        Department.department_id == department_id
    ).first()

    if existing_department:
        existing_department.department_name = department.department_name
        existing_department.description = department.description

        db.commit()
        db.refresh(existing_department)

    return existing_department


def delete_department(db: Session, department_id: int):

    existing_department = db.query(Department).filter(
        Department.department_id == department_id
    ).first()

    if existing_department:
        db.delete(existing_department)
        db.commit()

    return {"message": "Department deleted successfully"}