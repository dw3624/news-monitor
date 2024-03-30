import * as cheerio from 'cheerio'
import {
  CHANNEL_A_URL,
  JTBC_URL,
  KBS_URL,
  MBC_URL,
  SBS_URL,
  TV_CHOSUN_URL,
} from './const'
import { ArticleType, ChannelAArticleType, KBSArticleType } from './types'

export const getKBSArticles = async (
  date: string,
): Promise<ArticleType[] | null> => {
  try {
    const url = `${KBS_URL}&broadDate=${date}`

    const response = await fetch(url)
    const resText = await response.text()
    const resJson = JSON.parse(resText.replace(/\n/g, ''))
    const articleList = resJson.data

    return articleList.map((article: KBSArticleType) => ({
      category: article.menuName,
      title: article.newsTitle,
      href: `https://news.kbs.co.kr/news/view.do?ncd=${article.newsCode}`,
      articleDate: article.serviceTime.split(' ')[0].replace('-', ''),
    }))
  } catch (error) {
    console.error('Error fetching KBS articles:', error)
    return null
  }
}

export const getMBCArticles = async (date: string) => {
  try {
    const year = date.slice(0, 4)
    const calendar = `${MBC_URL}/${year}/nwdesk/cal_data.js`

    const calResponse = await fetch(calendar)
    const calText = await calResponse.text()
    const calJson = JSON.parse(calText.trim())
    const dateId = calJson.DateList.find((item) => item.Day === date)?.CurrentID

    if (!dateId) {
      console.error('Calendar data not found for the given date:', date)
      return null
    }

    const url = `${MBC_URL}/${year}/nwdesk/${dateId}_36510.html`

    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)
    const articleList = $('div.list_area > ul.thumb_type > li')

    return Array.from(articleList).map((element) => ({
      title: $(element).find('.txt_w > .tit').text(),
      url: $(element).find('a').attr('href'),
      date: date,
    }))
  } catch (error) {
    console.error('Error fetching MBC articles:', error)
    return null
  }
}

export const getSBSArticles = async (
  date: string,
): Promise<ArticleType[] | null> => {
  try {
    const url = `${SBS_URL}&broad_date=${date}&plink=CAL&cooper=SBSNEWS`

    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)
    const articleDate = $('#btn-open-datepicker2 > .date')
      .text()
      .replace('.', '')
    const articleList = $('ul#article-list > li')

    return Array.from(articleList).map((element) => {
      const category = $(element).find('em.cate').text()
      return {
        category: category,
        title: $(element).find('strong').text().replace(category, '').trim(),
        url: `https://news.sbs.co.kr${$(element).find('a').attr('href')}`,
        date: articleDate,
      }
    })
  } catch (error) {
    console.error('Error fetching KBS articles:', error)
    return null
  }
}

export const getJTBCArticles = async (
  date: string,
): Promise<ArticleType[] | null> => {
  try {
    const url = `${JTBC_URL}&strSearchDate=${date}`

    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)
    const articleDate = $(
      '#form1 > div.news_main > div.review_list > div.hd > h4',
    )
      .text()
      .split('(')[0]
      .replace('.', '')
      .replace('.', '')
      .trim()
    const articleList = $(
      '#form1 > div.news_main > div.review_list > div.bd > ul > li',
    )

    return Array.from(articleList).map((element) => ({
      title: $(element).find('div.rt > dl > dt >a').text(),
      url: $(element).find('div.rt > dl > dt >a').attr('href'),
      date: articleDate,
    }))
  } catch (error) {
    console.error('Error fetching KBS articles:', error)
    return null
  }
}

export const getChannelAArticles = async (
  date: string,
): Promise<ArticleType[] | null> => {
  try {
    const url = `${CHANNEL_A_URL}&selectedDate=${date}`

    const articleList = <ChannelAArticleType[]>[]

    for (let i = 0; i < 5; i++) {
      const response = await fetch(`${url}&pageNum=${i + 1}`)
      const resText = await response.text()
      const resJson = JSON.parse(resText.replace(/\n/g, ''))
      articleList.push(...resJson.programNewsList)

      if (resJson.programNewsList.length === 0) break
    }

    return articleList.map((article) => ({
      title: article.TITLE,
      url: `https://www.ichannela.com/news/main/news_detailPage.do?publishId=${article.PUBLISH_ID}`,
      date: article.SVC_START_DATE,
    }))
  } catch (error) {
    console.error('Error fetching KBS articles:', error)
    return null
  }
}

export const getTVChosunArticles = async (
  date: string,
): Promise<ArticleType[] | null> => {
  try {
    const dateStrp = new Date(
      `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`,
    )
    const weekday = dateStrp.getDay()
    const isHoliday = weekday === 0 || weekday === 6
    const url = `${TV_CHOSUN_URL}?catid=${
      isHoliday ? '75' : '2P'
    }&source=&indate=${date}`

    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)
    const articleDate = $('#iframe > div.newstop_area > p')
      .text()
      .split('(')[0]
      .replace('.', '')
      .replace('.', '')
      .trim()
    const articleList = $('#iframe > div.bbs_zine.top_line > ul > li')

    return Array.from(articleList).map((element) => {
      const href = $(element)
        .find('div.detail > p.article_tit > a')
        .attr('onclick')
      const match = href?.match(/go_url\('([^']+)'\)/)

      return {
        category: $(element).find('div.detail > p.tag > span').first().text(),
        title: $(element).find('div.detail > p.article_tit > a').text(),
        url: match ? match[1] : '',
        date: articleDate,
      }
    })
  } catch (error) {
    console.error('Error fetching KBS articles:', error)
    return null
  }
}
