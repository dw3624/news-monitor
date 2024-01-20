import json
from typing import Generator, List

import requests

region_dict = {
    # 강남라인
    "강남": ["강남소방서", "서초소방서", "송파소방서"],
    "광진": ["강동소방서", "광진소방서", "성동소방서"],
    # 영등포라인
    "관악": ["관악소방서", "금천소방서", "동작소방서", "서초소방서"],
    "마포": ["마포소방서", "서대문소방서", "은평소방서"],
    "영등포": ["강서소방서", "구로소방서", "양천소방서", "영등포소방서"],
    # 중부라인
    "중부": ["성북소방서", "종로소방서", "중부소방서", "용산소방서"],
    # 혜북라인
    "혜북": ["강북소방서", "노원소방서", "도봉소방서", "동대문소방서", "중랑소방서"],
}


def format_fire_msg(defail: dict) -> str:
    """각 행 정보를 메시지 양식으로 변환
    Args:
        defail (dict): 화재발생현황
    Returns:
        fire_msg (str): 메시지

        예:
        중랑소방서 (18:18)
        서울특별시 중랑구 상봉동
        사망: 0 / 부상: 0
        재산피해(천원) -
        진행: 출동 / 결과: -
    """

    fire_msg = (
        f"{defail['cntrNm']} ({defail['overDate']})\n"
        f"{defail['addr']}\n"
        f"사망: {defail['dethNum']} / 부상: {defail['injuNum']}\n"
        f"재산피해(천원): {defail['expMount']}\n"
        f"진행: {defail['progressNm']} / 결과: {defail['frfalTypeCd']}"
    )
    return fire_msg


def generate_fire_msg_list(
    defail_list: List[dict], fire_station_list: List[str]
) -> Generator[str, None, None]:
    """화재발생목록을 순환해 메시지 yield
    Args:
        defail_list (dict[]): 화재발생현황 목록
        fire_station_list (str[]): 소방서 목록
    """
    for defail in defail_list:
        if defail["cntrNm"] in fire_station_list:
            fire_msg = format_fire_msg(defail)
            yield fire_msg


def scrape_nfds(line: str) -> str:
    """nfds 스크래핑 후 메시지 생성
    Args:
        line (str): 검색할 라인
    """
    # 소방서 목록 설정
    if line == "강남전체":
        fire_station_list = region_dict["강남"] + region_dict["광진"]
    elif line == "영등포전체":
        fire_station_list = region_dict["관악"] + region_dict["마포"] + region_dict["영등포"]
    elif line == "광역중부":
        fire_station_list = region_dict["중부"] + region_dict["혜북"]
    else:
        fire_station_list = region_dict[line]

    # payload 설정
    url = "https://nfds.go.kr/dashboard/monitorData.do"
    # proxyDict = {"http": "add http proxy", "https": "add https proxy"}
    side_code = "11"  # 서울

    # 화재현황 스크래이핑 및 list 변환
    payload = {"sidoCode": side_code}
    res = requests.post(url, data=payload)
    res_json = json.loads(res.text)
    if len(res_json["defail"]) == 0:
        return "화재발생정보가 없습니다."

    fire_msg_lst = generate_fire_msg_list(res_json["defail"], fire_station_list)
    fire_msg_lst = list(fire_msg_lst)
    if len(fire_msg_lst) == 0:
        return "선택한 라인의 화재발생정보가 없습니다."

    res_msg = f"{line} 화재현황입니다. ({len(fire_msg_lst)}건)\n\n"
    res_msg += "\n\n".join(fire_msg_lst)
    return res_msg
