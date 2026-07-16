from sqlalchemy.orm import Session
from app.models.role import Role
from app.schemas.role import RoleCreate


def create_role(db: Session, role: RoleCreate):

    new_role = Role(
        role_name=role.role_name,
        description=role.description
    )

    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role
def get_roles(db: Session):
    return db.query(Role).all()
def get_roles(db: Session):
    return db.query(Role).all()
def get_role_by_id(db: Session, role_id: int):
    return db.query(Role).filter(Role.role_id == role_id).first()
def update_role(db: Session, role_id: int, role: RoleCreate):

    existing_role = db.query(Role).filter(Role.role_id == role_id).first()

    if existing_role:
        existing_role.role_name = role.role_name
        existing_role.description = role.description

        db.commit()
        db.refresh(existing_role)

    return existing_role
def delete_role(db: Session, role_id: int):

    role = db.query(Role).filter(Role.role_id == role_id).first()

    if role:
        db.delete(role)
        db.commit()

    return role