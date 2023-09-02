<script>
	import '../global.css';
</script>

<header>
	<div>
		<b>News Monitor</b>
	</div>
</header>

<div class="container flex-col">
	<slot />
</div>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 14px 24px;
		max-width: 1400px;
		margin: 0 auto;
		font-size: 18px;
	}
	.container {
		height: calc(100vh - 80px);
		max-width: 1400px;
		padding: 0 24px;
		margin: 0 auto 24px;
	}
</style>
