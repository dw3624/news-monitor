<script>
	export let textareaValue;

	function handleCopy() {
		navigator.clipboard.writeText(textareaValue);
	}
</script>

<section>
	<div class="section-header">
		<span />
		<button class="button-copy" on:click={handleCopy}>복사</button>
	</div>
	<div class="section-body">
		<textarea value={textareaValue} spellcheck="false" />
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
	div.section-body {
		flex: 1;
		display: flex;
		padding: 24px 0;
		flex-direction: column;
		border: 1px solid var(--light-gray);
		overflow: auto;
	}
	textarea {
		height: 100%;
		resize: none;
		line-height: 1.5;
		font-size: 16px;
		padding: 0 24px;
		border: none;
		outline: none;
	}
	@media (max-width: 480px) {
		section {
			flex: 2;
		}
		div.section-body {
			padding: 1rem 0;
		}
		textarea {
			padding: 0 1rem;
			font-size: 14px;
		}
	}
	.button-copy {
		color: var(--black);
		background-color: #fff;
		border: none;
		font-size: 14px;
		font-weight: 700;
	}
	.button-copy:hover {
		text-decoration: underline;
		transition: 0.2s;
	}
</style>
