from datetime import datetime

from fastapi import APIRouter, HTTPException

from .lib import scrape_article_list

router = APIRouter(prefix="/news-monitor")

today = datetime.now().strftime("%Y%m%d")


@router.get("/articles/{news}")
async def get_article_list(news: str, date: str = today):
    try:
        article_list = scrape_article_list(news=news, date=date)
        response = {
            "length": len(article_list),
            "news": news,
            "date": date,
            "data": article_list,
        }
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=repr(e))
