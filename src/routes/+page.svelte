<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { Loader } from '@o7/icon/lucide';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance, delayed, timeout } = superForm(data.form, {
		delayMs: 1000,
		timeoutMs: 10000,
	});

	let varviLisamine = $state(false);
	let varvid = $state(data.varvid);

	let varviSelect = $state<HTMLSelectElement>();
	let varviInput = $state<HTMLInputElement>();
	let varv = $state('');
	let varvLisatud = $state(false);
	function lisaVarv(varv: string) {
		if (varv == '') {
			$errors.varv = ['Lisatud varv ei saa olla tühi'];
		} else if (!varvid.includes(varv)) {
			varvid = [...varvid, varv];
			varviInput!.value = '';
			varvLisatud = true;
		}
		varviLisamine = false;
	}

	$effect(() => {
		varvid;
		if (varviSelect != undefined && varvLisatud) {
			varviSelect.selectedIndex = varviSelect.options.length - 1;
			varvLisatud = false;
		}
	});
</script>

<form class="m-4 flex w-full max-w-md flex-col gap-4" method="POST" use:enhance>
	<div class="flex flex-col gap-1">
		<label for="sugu">Vali oma sugu</label>
		<select id="sugu" name="sugu" class="h-12 rounded-md p-2">
			<option value="">Vali sugu</option>
			<option value="Mees">Mees</option>
			<option value="Naine">Naine</option>
		</select>
		<span class="h-4 text-red-500">{$errors.sugu}</span>
	</div>
	<div class="flex flex-col gap-1">
		<label for="varv">Vali oma üleriiete värv</label>
		<select
			id="varv"
			class="h-12 rounded-md p-2"
			name="varv"
			bind:this={varviSelect}
			disabled={varviLisamine}
		>
			<option value="">Ei ole valitud</option>
			{#each varvid as varv}
				<option value={varv}>{varv}</option>
			{/each}
		</select>
		<div class="flex gap-1" class:hidden={!varviLisamine}>
			<input
				type="text"
				placeholder="Ei ole valitud"
				class="h-12 w-full rounded-md border-2 p-2"
				bind:this={varviInput}
				bind:value={varv}
			/>
			<button
				type="button"
				class="h-12 rounded-md border-2 p-2"
				onclick={() => lisaVarv(varv)}>Lisa</button
			>
		</div>
		<div class="flex justify-between">
			<span class="h-4 text-red-500">{$errors.varv}</span>
			<label class="ml-auto" for="varv">
				<button
					type="button"
					onclick={() => {
						varviLisamine = !varviLisamine;
					}}
				>
					{varviLisamine ? 'Sulge' : 'Lisa värvi'}
				</button>
			</label>
		</div>
	</div>
	<button type="submit" class="w-full rounded-md border-2 p-2">
		{#if $delayed}
			<span class="flex justify-center">
				Sadan<Loader class="animate-spin" /></span
			>
		{:else if $timeout}
			Serveri viga, proovi uuesti
		{:else}
			Salvesta
		{/if}
	</button>
</form>
