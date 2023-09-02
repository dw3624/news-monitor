<script>
	export let type = 'button';
	export let active = false;
	export let onclick = null;
	export let value = '';
</script>

<button
	type={`${type}`}
	class={active ? 'button-active' : ''}
	value={`${value}`}
	on:click={onclick}
>
	<slot />
</button>

<style>
	button {
		padding: 8px 16px;
		color: var(--dark-gray);
		background-color: #fff;
		border: 1px solid var(--light-gray);
		font-size: 14px;
		font-weight: 700;
	}

	.button-active {
		color: var(--light-gray);
		border: 1px solid var(--black);
		background: var(--black);
	}
</style>
