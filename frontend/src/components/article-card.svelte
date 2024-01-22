<script>
	import { NEWS_TYPE } from '../utils/const'

	export let date;
	export let title;
	export let url;
	export let category;
	export let type
	export let typeRef
	export let keyword1
	export let keyword2
</script>

<div class="container">
	<div class="header">
		<sub>{date}{category ? ` · ${category}` : ''}</sub>
		<h3><a href={url} target="_blank">{title} ↗</a></h3>
	</div>
	<div class="content">
		<div class="article-type">
			{#each NEWS_TYPE as news_type}
			<label
				class={`radio-button ${news_type.value === 'rm' ? 'rm' : ''}`}
				for={news_type.value + title}
			>
				<input
					id={news_type.value + title}
					type="radio"
					bind:group={type}
					value={news_type.value}
				/>
				<span>{news_type.id}</span>
			</label>
			{/each}
			<label for={`is-ref-${title}`}>
				<input id={`is-ref-${title}`} type="checkbox" bind:checked={typeRef} />
				<span>참고</span>
			</label>
		</div>
		<div class="keyword">
			<input bind:value={keyword1} placeholder="키워드1" autocomplete="on" />
			<input bind:value={keyword2} placeholder="키워드2" autocomplete="on" />
		</div>
	</div>
</div>

<style>
	.header {
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}

	.content {
		padding: 0 1rem 1rem;
	}

	sub {
		margin-bottom: 0.375rem;
		font-size: var(--text-sm);
		color: hsl(var(--muted-foreground))
	}

	h3 {
		font-size: var(--text-md);
	}

	h3 > a {
		color: var(--black);
		text-decoration: none;
	}

	h3 > a:hover {
		text-decoration: underline;
	}

	.article-type {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	label input[type='radio'] {
		display: none;
	}

	label input[type='radio'] + span {
		display: inline-flex;
		padding: 0.25rem 0.75rem;
		font-size: var(--text-xs);
		font-weight: 600;
		color: hsl(var(--muted-foreground));
		cursor: pointer;
		background-color: transparent;
		border: 1px solid hsl(var(--muted-foreground) / 50%);
	}

	label input[type='checkbox'] + span {
		display: inline-flex;
		padding: 0.25rem 0.75rem;
		font-size: var(--text-xs);
		font-weight: 600;
		color: hsl(var(--blue));
		cursor: pointer;
		user-select: none;
		background-color: transparent;
		border: 1px solid hsl(var(--blue));
	}

	label input[type='checkbox']:checked + span {
		color: hsl(var(--blue-foreground));
		background-color: hsl(var(--blue));
	}

	label input[type='radio']:checked + span {
		color: hsl(var(--primary-foreground));
		background-color: hsl(var(--primary));
		border: 1px solid transparent;
	}

	label.rm input[type='radio'] + span {
		color: hsl(var(--red));
		border: 1px solid hsl(var(--red));
	}

	label.rm input[type='radio']:checked + span {
		color: hsl(var(--red-foreground));
		background-color: hsl(var(--red));
	}

	label input[type='checkbox'] {
		display: none;
	}

	.keyword {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.keyword > input {
		width: 7.5rem;
		height: 1.5rem;
		color: hsl(var(--muted-foreground));
		border: none;
		border-bottom: 1px solid hsl(var(--muted-foreground) / 50%);
		outline: none;
	}
</style>
