from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.dependencies import require_admin
from app.database import get_db
from app.schemas.role import RoleCreate, RoleResponse
from app.services.role_service import create_role,get_roles,get_role_by_id,update_role,delete_role

router = APIRouter(
    prefix="/roles",
    tags=["Roles"]
)


@router.post("/", response_model=RoleResponse)
def add_role(role: RoleCreate, db: Session = Depends(get_db),current_user=Depends(require_admin)):
    return create_role(db, role)
@router.get("/", response_model=list[RoleResponse])
def read_roles(db: Session = Depends(get_db),current_user=Depends(require_admin)):
    return get_roles(db)
@router.get("/{role_id}", response_model=RoleResponse)
def read_role(role_id: int, db: Session = Depends(get_db),current_user=Depends(require_admin)):
    return get_role_by_id(db, role_id)
@router.put("/{role_id}", response_model=RoleResponse)
def edit_role(
    role_id: int,
    role: RoleCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return update_role(db, role_id, role)
@router.delete("/{role_id}", response_model=RoleResponse)
def remove_role(role_id: int, db: Session = Depends(get_db),current_user=Depends(require_admin)):
    return delete_role(db, role_id)