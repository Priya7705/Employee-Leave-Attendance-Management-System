from pydantic import BaseModel


class DashboardStats(BaseModel):

    total_employees: int

    present_today: int

    pending_leaves: int