<script>
	import { NEWS_LIST } from '../utils/const'
	export let selectedNews;
	export let handleNewsChange;
	export let selectedDate;
	export let handleDateChange;
</script>

<div class="container">
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
	.container {
		display: flex;
		align-items: center;
		align-self: stretch;
		justify-content: space-between;
		padding: 0.5rem 0;
	}

	.button-list {
		display: flex;
		gap: 0.5rem;
	}

	button {
		padding: 0.25rem 0.75rem;
		font-size: var(--text-sm);
		font-weight: 700;
		cursor: pointer;
		background-color: transparent;
		border: 1px solid hsl(var(--border));
		transition: .2s;

	}

	.button-active {
		color: hsl(var(--primary-foreground));
		background: hsl(var(--primary));
	}

	button:hover {
		color: hsl(var(--accent-foreground));
		background-color: hsl(var(--accent));
	}

	.button-active:hover {
		color: hsl(var(--primary-foreground));
		background-color: hsl(var(--primary) / 80%);
	}

	@media (width < 480px) {
		.button-list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}

		button {
			padding: 0.25rem 0.5rem;
			font-size: var(--text-sm);
		}
	}
</style>
