import json
import re
from datetime import datetime
from typing import List

import requests
from bs4 import BeautifulSoup as bs

NEWS_MAP = {
    "kbs": "https://news.kbs.co.kr/api/getNewsList?currentPageNo=1&rowsPerPage=48&exceptPhotoYn=Y&broadCode=0001&needReporterInfo=Y&orderBy=broadDate_desc%2CbroadOrder_asc",
    "mbc_cal": "https://imnews.imbc.com/replay/2023/nwdesk/cal_data.js",
    "mbc": "https://imnews.imbc.com/replay/2023/nwdesk/",
    "sbs": "https://news.sbs.co.kr/news/programMain.do?prog_cd=R1",
    "jtbc": "https://news.jtbc.co.kr/Replay/news_replay.aspx?fcode=PR10000403",
    "tv_chosun": "http://news.tvchosun.com/svc/vod/ospc_news_prog_pan.html",
    "channel_a": "https://www.ichannela.com/news/template/getProgramCateNews.do?catecode=000500&pgmCode=000500&search=date&isSetNowDate=true",
}


def get_kbs_article_list(url: str, date: str) -> List[dict]:
    article_list = []
    try:
        url += f"&broadDate={date}"
        response = requests.get(url)
        response_json = json.loads(response.text)
        article_json_list = response_json.get("data")
        for article in article_json_list:
            category = article.get("menuName")
            title = article.get("newsTitle")
            href = "https://news.kbs.co.kr/news/view.do?ncd=" + article.get("newsCode")
            article_date = article.get("serviceTime").split()[0].replace("-", "")
            article_list.append(
                {
                    "category": category,
                    "title": title,
                    "url": href,
                    "date": article_date,
                    "type": "rm",
                    "typeRef": "",
                    "keyword1": "",
                    "keyword2": "",
                }
            )
        return article_list

    except Exception as e:
        print(repr(e))
        return None


def get_mbc_article_list(url: str, date: str) -> List[dict]:
    year = date[:4]
    mbc_cal_url = f"https://imnews.imbc.com/replay/{year}/nwdesk/cal_data.js"
    mbc_url = f"https://imnews.imbc.com/replay/{year}/nwdesk/"
    article_list = []

    try:
        cal_response = requests.get(mbc_cal_url)
        cal_response = cal_response.text.lstrip("\ufeff")
        cal_json = json.loads(cal_response)
        cal_date_list = cal_json.get("DateList")
        target_object = next(item for item in cal_date_list if item.get("Day") == date)
        date_id = target_object.get("CurrentID")

        mbc_url += f"{date_id}_36510.html"
        response = requests.get(mbc_url)
        html = response.text
        soup = bs(html, "html.parser")
        article_li_list = soup.select("div.list_area > ul.thumb_type > li")

        for article in article_li_list:
            title = article.select_one(".txt_w > .tit").text
            href = article.a["href"]
            article_list.append(
                {
                    "category": None,
                    "title": title,
                    "url": href,
                    "date": date,
                    "type": "rm",
                    "typeRef": "",
                    "keyword1": "",
                    "keyword2": "",
                }
            )
        return article_list

    except Exception as e:
        print(repr(e))
        return None


def get_sbs_article_list(url: str, date: str) -> List[dict]:
    article_list = []
    try:
        url += f"&broad_date={date}&plink=CAL&cooper=SBSNEWS"
        response = requests.get(url)
        html = response.text
        soup = bs(html, "html.parser")
        article_date = soup.select_one("#btn-open-datepicker2 > strong").text.replace(
            ".", ""
        )
        article_li_list = soup.select("ul#article-list > li")
        for article in article_li_list:
            category = article.select_one("em.cate").text
            title = article.strong.get_text().replace(category, "").strip()
            href = "https://news.sbs.co.kr" + article.a["href"]
            article_list.append(
                {
                    "category": category,
                    "title": title,
                    "url": href,
                    "date": article_date,
                    "type": "rm",
                    "typeRef": "",
                    "keyword1": "",
                    "keyword2": "",
                }
            )
        return article_list

    except Exception as e:
        print(repr(e))
        return None


def get_jtbc_article_list(url: str, date: str) -> List[dict]:
    article_list = []
    try:
        url += f"&strSearchDate={date}"
        response = requests.get(url)
        html = response.text
        soup = bs(html, "html.parser")
        article_date = (
            soup.select_one("#form1 > div.news_main > div.review_list > div.hd > h4")
            .text.split("(")[0]
            .replace(".", "")
            .strip()
        )
        article_ul_list = soup.select(
            "#form1 > div.news_main > div.review_list > div.bd > ul > li"
        )
        for article in article_ul_list:
            category = None
            title = article.select_one("div.rt > dl > dt >a").text
            href = article.select_one("div.rt > dl > dt >a")["href"]
            article_list.append(
                {
                    "category": category,
                    "title": title,
                    "url": href,
                    "date": article_date,
                    "type": "rm",
                    "typeRef": "",
                    "keyword1": "",
                    "keyword2": "",
                }
            )
        return article_list

    except Exception as e:
        print(repr(e))
        return None


def get_channel_a_article_list(url: str, date: str) -> List[dict]:
    article_list = []
    try:
        url += f"&selectedDate={date}"
        response_1 = requests.get(url + "&pageNum=1")
        response_2 = requests.get(url + "&pageNum=2")
        response_json_1 = json.loads(response_1.text)
        response_json_2 = json.loads(response_2.text)
        article_json_list = response_json_1.get(
            "programNewsList"
        ) + response_json_2.get("programNewsList")
        for article in article_json_list:
            category = None
            title = article.get("TITLE")
            href = (
                "https://www.ichannela.com/news/main/news_detailPage.do?publishId="
                + article.get("PUBLISH_ID")
            )
            article_date = article.get("SVC_START_DATE")
            article_list.append(
                {
                    "category": category,
                    "title": title,
                    "url": href,
                    "date": article_date,
                    "type": "rm",
                    "typeRef": "",
                    "keyword1": "",
                    "keyword2": "",
                }
            )
        return article_list

    except Exception as e:
        print(repr(e))
        return None


def get_tv_chosun_article_list(url: str, date: str) -> List[dict]:
    article_list = []
    date_strp = datetime.strptime(date, "%Y%m%d")
    if date_strp.weekday() in [5, 6]:
        url += "?catid=75"
    else:
        url += "?catid=2P"

    try:
        url += f"&source=&indate={date}"
        response = requests.get(url)
        html = response.text
        soup = bs(html, "html.parser")
        article_date = (
            soup.select_one("#iframe > div.newstop_area > p")
            .text.split("(")[0]
            .replace(".", "")
            .strip()
        )
        article_ul_list = soup.select("#iframe > div.bbs_zine.top_line > ul > li")
        pattern = r"go_url\('([^']+)'\)"
        for article in article_ul_list:
            category = article.select_one("div.detail > p.tag > span").text
            a_tag = article.select_one("div.detail > p.article_tit > a")
            title = a_tag.text
            match = re.search(pattern, str(a_tag))
            href = match.group(1) if match else None
            article_list.append(
                {
                    "category": category,
                    "title": title,
                    "url": href,
                    "date": article_date,
                    "type": "rm",
                    "typeRef": "",
                    "keyword1": "",
                    "keyword2": "",
                }
            )
        return article_list

    except Exception as e:
        print(repr(e))
        return None


news_function_dict = {
    "kbs": get_kbs_article_list,
    "mbc": get_mbc_article_list,
    "sbs": get_sbs_article_list,
    "jtbc": get_jtbc_article_list,
    "channel_a": get_channel_a_article_list,
    "tv_chosun": get_tv_chosun_article_list,
}


def scrape_article_list(news: str, date: str) -> List[dict]:
    """
    Args:
        news (str): kbs | mbc | sbs | jtbc | channel_a | tv_chosun |
        date (str): YYYYMMDD

    Returns:
        List[{"category": str | None, "title": str, "url": str, "date": str}]
    """
    try:
        url = NEWS_MAP.get(news)
        news_function = news_function_dict.get(news)
        article_list = news_function(url=url, date=date)
        return article_list

    except Exception as e:
        print(repr(e))
        return None
