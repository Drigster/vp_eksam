<script lang="ts">
	import '../app.css';

	const { children } = $props();
</script>

<main class="flex h-screen flex-col items-center justify-center">
	<h1 class="text-center text-4xl font-bold">Tanavavaatlusmärkmik</h1>
	{@render children()}
</main>
