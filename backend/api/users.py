from fastapi import APIRouter

from services.users import get_users

router = APIRouter()

@router.get("/users")
def users():
    return get_users()


