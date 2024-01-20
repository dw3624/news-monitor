<script>
	import ArticleCardList from '../components/article-card-list.svelte'
	import ArticleTextarea from '../components/article-textarea.svelte'
	import DateBroadcastPicker from '../components/date-broadcast-picker.svelte'
	import {getArticleList} from '../utils/api'
	import {testArticles} from '../utils/test-data.ts'

	let selectedDate = new Date().toISOString().slice(0, 10);
	const handleDateChange = (event)=> {
		selectedDate = event.target.value;
	}

	let selectedNews = '';
	let articles = testArticles;
	const handleNewsChange = async (event) => {
		selectedNews = event.target.value;
		const formattedDate = selectedDate.split('-').join('');
		articles = await getArticleList(selectedNews, formattedDate);
	}

	const generateKeywordText = (typeRef, keyword1, keyword2) => {
    const keywordList = [typeRef, keyword1, keyword2].filter(Boolean)
    const keywordText = keywordList.join(', ')
    if (keywordText) return `(${keywordText})`
    return keywordText
	}

	const generateText=(articles) => {
		let resText = '';
		if (articles) {
			articles.data.map((article) => {
				let typeRef = article.typeRef ? '참고' : '';
				if (article.type !== 'rm') {
					resText +=
						article.type +
						article.title +
						generateKeywordText(typeRef, article.keyword1, article.keyword2) +
						'\n';
				}
			});
		}
		return resText;
	}
	$: textareaValue = generateText(articles);
</script>

<DateBroadcastPicker {selectedNews} {handleNewsChange} {selectedDate} {handleDateChange} />
<div class="container">
	<ArticleCardList bind:articles />
	<ArticleTextarea {textareaValue} />
</div>

<style>
	.container {
    display: grid;
		flex: 1;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
    height: 100%;
		max-height: calc(100vh - 6rem);
    padding-bottom: 1.5rem;
		overflow: auto;
	}
	@media screen and (width < 768px) {
		.container {
			grid-template-rows: repeat(2, 1fr);;
      grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
	@media screen and (width < 480px) {
		.container {
			max-height: calc(100vh - 8rem);
		}
	}

</style>
