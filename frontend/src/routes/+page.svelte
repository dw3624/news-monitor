<script>
	import { getArticleList } from '../utils/api';
	import { testArticles } from '../utils/test-data';
	import ArticleCardList from '../components/article-card-list.svelte';
	import ArticleTextarea from '../components/article-textarea.svelte';
	import DateBroadcastPicker from '../components/date-broadcast-picker.svelte';

	let selectedDate = new Date().toISOString().slice(0, 10);
	function handleDateChange(event) {
		selectedDate = event.target.value;
	}

	let selectedNews = '';
	let articles = testArticles;
	async function handleNewsChange(event) {
		selectedNews = event.target.value;
		const formattedDate = selectedDate.split('-').join('');
		articles = await getArticleList(selectedNews, formattedDate);
	}
	function generateKeywordText(keyword1, keyword2) {
		if (keyword1 && keyword2) {
			return `(${keyword1}, ${keyword2})`;
		} else if (keyword1) {
			return `(${keyword1})`;
		} else if (keyword2) {
			return `(${keyword2})`;
		} else {
			return '';
		}
	}
	function generateText(articles) {
		let resText = '';
		console.log(articles);
		if (articles) {
			articles.data.map((article) => {
				let typeRef = article.typeRef ? '[참고]' : '';
				if (article.type !== 'rm') {
					resText +=
						article.type +
						typeRef +
						article.title +
						generateKeywordText(article.keyword1, article.keyword2) +
						'\n';
				}
			});
		}
		return resText;
	}
	$: textareaValue = generateText(articles);
</script>

<DateBroadcastPicker {selectedNews} {handleNewsChange} {selectedDate} {handleDateChange} />

<main>
	<ArticleCardList bind:articles />
	<ArticleTextarea {textareaValue} />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		gap: 24px;
		max-height: 100%;
		overflow: auto;
	}
	@media (max-width: 768px) {
		main {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
