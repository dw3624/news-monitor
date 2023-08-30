import os

from lib.get_articles import *

news = "tv_chosun"
date = "20230818"
url = os.getenv(news)

res_dict = get_article_list(news=news, date=date)
print(res_dict)
