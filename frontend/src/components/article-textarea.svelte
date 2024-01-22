<script>
	export let textareaValue;
	let isCopySuccess = false

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(textareaValue)
			isCopySuccess = true
			setTimeout(() => isCopySuccess = false, 2000);
		} catch ( error ) {
			console.log('Copy failed...')
		}
	}
</script>

<section>
	<div class="header">
		<span class={`msg ${isCopySuccess && "visible"}`}>복사가 성공했습니다.</span>
		<button class="button-copy" on:click={handleCopy}>복사</button>
	</div>
	<div class="content">
		<textarea bind:value={textareaValue} spellcheck="false" />
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

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: auto;
		border: 1px solid hsl(var(--border));
		border-radius: var(--radius);
	}

	textarea {
		height: 100%;
		padding: 1rem 1.5rem;
		font-size: var(--text-md);
		line-height: 1.5;
		resize: none;
		border: none;
		outline: none;
	}

	@media (width <= 480px) {
		textarea {
			font-size: var(--text-sm);
		}
	}

	.button-copy {
		font-size: var(--text-sm);
		font-weight: 600;
		cursor:pointer;
		background-color: transparent;
		border: none;
		border-radius: var(--radius);
		transition: .2s;
	}

	.button-copy:hover {
		text-decoration: underline;
	}

	.msg {
    opacity: 0;
    transition: opacity 0.15s ease-out;
  }

  .msg.visible {
    opacity: 1;
  }
</style>
