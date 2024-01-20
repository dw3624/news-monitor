from datetime import datetime

from fastapi import APIRouter, Form
from fastapi.responses import JSONResponse

from .lib import scrape_nfds

router = APIRouter(prefix="/nfds")

today = datetime.now().strftime("%Y%m%d")


@router.post("/line-fire")
async def line_fire_detail(kakao_request: dict):
    """
    Args:
        kakao_request (dict): 카카오 요청 json
    """

    try:
        line_name = kakao_request["action"]["params"]["lineFire"]
        fire_msg = scrape_nfds(line_name)
        response = {
            "version": "2.0",
            "template": {"outputs": [{"simpleText": {"text": fire_msg}}]},
        }
        return JSONResponse(response)

    except Exception as e:
        print(repr(e))
        err_msg = "예기치 못한 오류가 발생했습니다."
        response = {
            "version": "2.0",
            "template": {"outputs": [{"simpleText": {"text": err_msg}}]},
        }
        return JSONResponse(response)


@router.post("/line-fire/test")
async def line_fire_detail(line_name: str = Form(...)):
    """
    Args:
        line_name (str, optional): 라인 이름
            (전체라인) 강남전체, 영등포전체, 광역중부
            (세부라인) 강남, 광진, 관악, 마포, 영등포, 중부, 혜북
    """

    try:
        fire_msg = scrape_nfds(line_name)
        response = {
            "version": "2.0",
            "template": {"outputs": [{"simpleText": {"text": fire_msg}}]},
        }
        return JSONResponse(response)

    except Exception as e:
        print(repr(e))
        err_msg = "예기치 못한 오류가 발생했습니다."
        response = {
            "version": "2.0",
            "template": {"outputs": [{"simpleText": {"text": err_msg}}]},
        }
        return JSONResponse(response)
