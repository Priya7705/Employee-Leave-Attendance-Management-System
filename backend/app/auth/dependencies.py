from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.auth.security import verify_token

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/login"
)

def get_current_user(
    token: str = Depends(oauth2_scheme)
):
    print("TOKEN RECEIVED:", token)

    payload = verify_token(token)

    print("PAYLOAD:", payload)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    return payload

    return payload
def require_admin(current_user=Depends(get_current_user)):
    if current_user["role_id"] != 1:
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )
    return current_user


def require_hr(current_user=Depends(get_current_user)):
    if current_user["role_id"] not in [1, 2]:
        raise HTTPException(
            status_code=403,
            detail="HR/Admin access required"
        )
    return current_user