from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user_schema import UserCreate
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    new_user = User(
        email=user.email,
        password=hashed_password,
        role_id=user.role_id,
        is_active=user.is_active
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def get_users(db: Session):
    return db.query(User).all()


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.user_id == user_id).first()


def update_user(db: Session, user_id: int, user: UserCreate):
    existing_user = db.query(User).filter(User.user_id == user_id).first()

    if existing_user:
        existing_user.email = user.email
        existing_user.password = pwd_context.hash(user.password)
        existing_user.role_id = user.role_id
        existing_user.is_active=user.is_active

        db.commit()
        db.refresh(existing_user)

    return existing_user


def delete_user(db: Session, user_id: int):
    existing_user = db.query(User).filter(User.user_id == user_id).first()

    if existing_user:
        db.delete(existing_user)
        db.commit()

    return {"message": "User deleted successfully"}