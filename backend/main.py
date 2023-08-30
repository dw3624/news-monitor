from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from lib.get_articles import get_article_list

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

today = datetime.now().strftime("%Y%m%d")

@app.get("/articles/{news}")
async def get_articles(news: str, date:str = today):
    try:
        article_list = get_article_list(news=news, date=date)
        res_dict = {"length": len(article_list), "date": date, "data": article_list}
        return res_dict

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
