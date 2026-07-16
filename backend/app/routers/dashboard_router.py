from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.dashboard_schema import DashboardStats
from app.services.dashboard_service import get_dashboard_stats

from app.auth.dependencies import require_hr

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get(
    "/stats",
    response_model=DashboardStats
)
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user=Depends(require_hr)
):

    return get_dashboard_stats(db)