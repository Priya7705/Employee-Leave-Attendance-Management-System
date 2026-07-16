from pydantic import BaseModel


class RoleCreate(BaseModel):
    role_name: str
    description: str


class RoleResponse(BaseModel):
    role_id: int
    role_name: str
    description: str

    class Config:
        from_attributes = True