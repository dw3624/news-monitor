<script>
	import { NEWS_TYPE } from '../utils/constant';

	export let date;
	export let title;
	export let url;
	export let category;
	export let type;
	export let keyword1;
	export let keyword2;
	export let typeRef;
</script>

<div class="card-container">
	<div class="card-header">
		<sub>{date}{category ? ` · ${category}` : ''}</sub>
		<h3><a href={url} target="_blank">{title}</a></h3>
	</div>
	<div class="card-type">
		{#each NEWS_TYPE as news_type, i}
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
	<div class="card-keyword">
		<input bind:value={keyword1} placeholder="키워드1" autocomplete="on" />
		<input bind:value={keyword2} placeholder="키워드2" autocomplete="on" />
	</div>
</div>

<style>
	div.card-container {
		padding: 0 24px 24px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	@media (max-width: 480px) {
		div.card-container {
			padding: 0 1rem 1rem;
			gap: 0.75rem;
		}
	}
	sub {
		color: var(--dark-gray, #8f8f8f);
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	h3 {
		color: var(--black);
		font-family: Inter;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		margin: 4px 0 0;
	}
	h3 > a {
		color: var(--black);
		text-decoration: none;
	}
	h3 > a:hover {
		text-decoration: underline;
	}
	div.card-type {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	div.card-keyword {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}
	label input[type='radio'] {
		display: none;
	}
	label input[type='radio'] + span {
		display: inline-block;
		padding: 4px 12px;
		color: var(--dark-gray);
		background-color: #fff;
		border: 1px solid var(--light-gray);
		cursor: pointer;
		user-select: none;
		font-size: 12px;
		font-weight: 700;
	}
	label input[type='radio']:checked + span {
		background-color: var(--black);
		color: var(--light-gray);
		border: 1px solid var(--black);
	}
	label.rm input[type='radio'] + span {
		color: var(--red);
		border: 1px solid var(--red);
	}
	label.rm input[type='radio']:checked + span {
		background-color: var(--red);
		color: #fff;
	}
	label input[type='checkbox'] {
		display: none;
	}
	label input[type='checkbox'] + span {
		display: inline-block;
		padding: 4px 12px;
		color: var(--blue);
		background-color: #fff;
		border: 1px solid var(--blue);
		cursor: pointer;
		user-select: none;
		font-size: 12px;
		font-weight: 700;
	}
	label input[type='checkbox']:checked + span {
		background-color: var(--blue);
		color: #fff;
	}
	div.card-keyword > input {
		border: none;
		border-bottom: 1px solid var(--light-gray);
		outline: none;
		padding: 4px 0;
		color: var(--black);
		width: 120px;
	}
</style>
