<script>
	import ArticleCard from './article-card.svelte';
	export let articles;
</script>

<section>
	<div class="section-header">
		<span><b>{articles ? articles.length : 0}</b> 건</span>
	</div>
	<div class="section-body">
		{#if articles}
			{#each articles.data as article, i}
				<ArticleCard
					title={article.title}
					url={article.url}
					date={article.date}
					category={article.category}
					bind:type={article.type}
					bind:typeRef={article.typeRef}
					bind:keyword1={article.keyword1}
					bind:keyword2={article.keyword2}
				/>
			{/each}
		{/if}
	</div>
</section>

<style>
	section {
		flex: 1;
		overflow: auto;
		display: flex;
		flex-direction: column;
	}
	div.section-header {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 6px;
	}
	span {
		display: block;
		font-size: 14px;
		padding: 1px 4px;
	}
	div.section-body {
		flex: 1;
		display: flex;
		padding: 24px 0;
		flex-direction: column;
		border: 1px solid var(--light-gray);
		overflow: auto;
	}
	@media (max-width: 480px) {
		section {
			flex: 3;
		}
		div.section-body {
			padding: 1rem 0;
		}
	}
</style>
