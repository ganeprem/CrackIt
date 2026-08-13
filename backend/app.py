from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.users import router as users_router
from api.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(users_router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {
            "message": "Crackit API"
    }


