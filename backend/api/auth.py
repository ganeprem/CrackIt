from fastapi import APIRouter

from fastapi import Response

from fastapi import HTTPException

from fastapi import Cookie

from models.auth import (
        RegisterRequest,
        LoginRequest
)

from services.auth import register_user

from services.auth import authenticate

from services.session import create_session

from services.session import get_user_from_session


router = APIRouter()

@router.post("/register")
def register(request: RegisterRequest):
    
    register_user(
            request.username,
            request.email,
            request.password
        )

    return {
            "message": "Registration successful"
    }


@router.post("/login")
def login(request: LoginRequest, response: Response):

    user = authenticate(
            request.username,
            request.password
    )

    if user is None:
        raise HTTPException(
                status_code=401,
                detail="Invalid username or password"
        )

    session_id = create_session(user["id"])

    print(session_id)

    response.set_cookie(
            key="session_id",
            value=session_id,
            httponly=True
    )


    return {
            "message":"Logged in"
    }


@router.get("/me")
def me(session_id: str | None = Cookie(default=None)):
    
    if session_id is None:
        raise HTTPException(
                status_code = 401,
                detail="Not logged in"
        )

    user = get_user_from_session(session_id)

    if user is None:
        raise HTTPException(
                status_code=401,
                detail="Invalid session"
        )
        

    return {
            "id":user[0],
            "username":user[1],
            "email":user[2]
    }



