from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.payroll import Payroll
from app.schemas.payroll_schema import PayrollCreate
from app.models.employee import Employee

# Create Payroll
def create_payroll(db: Session, payroll: PayrollCreate):

    net_salary = (
        payroll.basic_salary
        + payroll.allowances
        - payroll.deductions
    )

    new_payroll = Payroll(
        **payroll.model_dump(),
        net_salary=net_salary
    )

    db.add(new_payroll)
    db.commit()
    db.refresh(new_payroll)

    return new_payroll


# Bulk Create Payroll
def create_bulk_payroll(db: Session, payrolls: list[PayrollCreate]):

    payroll_objects = []

    for payroll in payrolls:

        net_salary = (
            payroll.basic_salary
            + payroll.allowances
            - payroll.deductions
        )

        payroll_obj = Payroll(
            **payroll.model_dump(),
            net_salary=net_salary
        )

        db.add(payroll_obj)
        payroll_objects.append(payroll_obj)

    db.commit()

    for payroll_obj in payroll_objects:
        db.refresh(payroll_obj)

    return {
        "success": True,
        "message": "Bulk payroll records inserted successfully.",
        "records_inserted": len(payroll_objects)
    }


# Get All Payroll Records
def get_payrolls(db: Session):
    return db.query(Payroll).all()


# Get Payroll By ID
def get_payroll_by_id(db: Session, payroll_id: int):

    payroll = db.query(Payroll).filter(
        Payroll.payroll_id == payroll_id
    ).first()

    if not payroll:
        raise HTTPException(
            status_code=404,
            detail="Payroll record not found"
        )

    return payroll


# Update Payroll
def update_payroll(
    db: Session,
    payroll_id: int,
    payroll: PayrollCreate
):

    existing_payroll = db.query(Payroll).filter(
        Payroll.payroll_id == payroll_id
    ).first()

    if not existing_payroll:
        raise HTTPException(
            status_code=404,
            detail="Payroll record not found"
        )

    existing_payroll.employee_id = payroll.employee_id
    existing_payroll.pay_month = payroll.pay_month
    existing_payroll.basic_salary = payroll.basic_salary
    existing_payroll.allowances = payroll.allowances
    existing_payroll.deductions = payroll.deductions
    existing_payroll.payment_date = payroll.payment_date

    existing_payroll.net_salary = (
        payroll.basic_salary
        + payroll.allowances
        - payroll.deductions
    )

    db.commit()
    db.refresh(existing_payroll)

    return existing_payroll


# Delete Payroll
def delete_payroll(db: Session, payroll_id: int):

    payroll = db.query(Payroll).filter(
        Payroll.payroll_id == payroll_id
    ).first()

    if not payroll:
        raise HTTPException(
            status_code=404,
            detail="Payroll record not found"
        )

    db.delete(payroll)
    db.commit()

    return {
        "message": "Payroll record deleted successfully."
    }
def get_my_payroll(db: Session, user_id: int):

    employee = (
        db.query(Employee)
        .filter(Employee.user_id == user_id)
        .first()
    )

    if not employee:
        return []

    return (
        db.query(Payroll)
        .filter(Payroll.employee_id == employee.employee_id)
        .all()
    )