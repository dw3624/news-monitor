<script>
	import Header from '../components/base/header.svelte';
	import '../styles/global.css';
</script>

<div class="container">
	<Header/>
	<main>
		<slot />
	</main>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	main {
		flex: 1;
		width: 100%;
		max-width: 1400px;
		padding: 0 1.5rem;
		margin: 0 auto;
	}
</style>
