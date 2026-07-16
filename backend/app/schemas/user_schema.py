from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    role_id: int
    is_active: bool = True
    


class UserResponse(BaseModel):
    user_id: int
    email: str
    role_id: int
    is_active: bool

    class Config:
        from_attributes = True