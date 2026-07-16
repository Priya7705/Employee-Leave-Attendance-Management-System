from pydantic import BaseModel


class DepartmentCreate(BaseModel):
    department_name: str
    description: str


class DepartmentResponse(BaseModel):
    department_id: int
    department_name: str
    description: str

    class Config:
        from_attributes = True