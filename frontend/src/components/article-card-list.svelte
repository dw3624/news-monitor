<script>
	import ArticleCard from './article-card.svelte';
	export let articles;
	export let loading
</script>

<section>
	<div class="header">
		{#if articles.news === 'jtbc'}
			<span class="warning">※ JTBC는 기사 제목이 잘리는 경우가 있습니다.</span>
		{:else}
			<span/>
		{/if}
		<span><b>{articles ? articles.length : 0}</b>건</span>
	</div>
	<div class="content">
		{#if loading}
			<div class="msg">
				<iconify-icon icon="lucide:loader-2" class="loading" />
				로딩 중...
			</div>
		{:else}
			{#if articles.length > 0}
				{#each articles.data as article}
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
			{:else}
			<div class="msg">
				기사가 없습니다.
			</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		overflow: auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: var(--text-sm);
	}

	.warning {
		font-size: var(--text-xs);
		font-weight: 600;
		color: hsl(var(--destructive));
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: auto;
		border: 1px solid hsl(var(--border));
		border-radius: var(--radius);
	}

	.loading {
		width: 1rem;
		height: 1rem;
		margin-right: 0.5rem;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg)
		}

		to {
			transform: rotate(360deg);
		}
	}

	.msg {
		display: inline-flex;
		flex: 1;
		align-items: center;
		margin: auto;
	}
</style>
