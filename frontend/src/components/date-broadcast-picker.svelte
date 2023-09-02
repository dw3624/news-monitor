<script>
	import { NEWS_LIST } from '../utils/constant';

	export let selectedNews;
	export let handleNewsChange;
	export let selectedDate;
	export let handleDateChange;
</script>

<div class="button-container">
	<div class="button-list">
		{#each NEWS_LIST as news}
			<button
				type="button"
				class={selectedNews === news.id ? 'button-active' : ''}
				value={news.id}
				on:click={handleNewsChange}
				>{news.value}
			</button>
		{/each}
	</div>
	<div>
		<input type="date" on:change={handleDateChange} value={selectedDate} />
	</div>
</div>

<style>
	.button-container {
		display: flex;
		padding: 24px 0;
		justify-content: space-between;
		align-items: center;
		align-self: stretch;
	}
	@media (max-width: 768px) {
		.button-container {
			flex-direction: column-reverse;
			gap: 1rem;
			padding: 0;
		}
	}
	.button-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	button {
		padding: 8px 16px;
		color: var(--dark-gray);
		background-color: #fff;
		border: 1px solid var(--light-gray);
		font-size: 14px;
		font-weight: 700;
	}
	@media (max-width: 480px) {
		button {
			padding: 4px 12px;
		}
	}
	.button-active {
		color: var(--light-gray);
		border: 1px solid var(--black);
		background: var(--black);
	}
</style>
