from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.dependencies import require_admin
from app.database import SessionLocal
from app.schemas.user_schema import UserCreate, UserResponse
from app.services.user_service import create_user,get_users,get_user,update_user,delete_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=UserResponse)
def add_user(user: UserCreate, db: Session = Depends(get_db),current_user=Depends(require_admin)):
    return create_user(db, user)

@router.get("/", response_model=list[UserResponse])
def read_users(db: Session = Depends(get_db),
            current_user=Depends(require_admin)):
    return get_users(db)


@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db),current_user=Depends(require_admin)):
    return get_user(db, user_id)


@router.put("/{user_id}", response_model=UserResponse)
def edit_user(user_id: int, user: UserCreate, db: Session = Depends(get_db),current_user=Depends(require_admin)):
    return update_user(db, user_id, user)


@router.delete("/{user_id}")
def remove_user(user_id: int, db: Session = Depends(get_db),current_user=Depends(require_admin)):
    return delete_user(db, user_id)