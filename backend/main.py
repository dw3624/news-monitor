from app.news_monitor.routers import router as news_monitor_router
from app.nfds.routers import router as nfds_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(nfds_router)
app.include_router(news_monitor_router)
