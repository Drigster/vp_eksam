<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let vastajaNumber = $state(0);
	if (data.varvid != undefined) {
		data.varvid.forEach((varv) => {
			vastajaNumber += varv.mehed + varv.naised;
		});
	}
</script>

<h3 class="text-center text-2xl font-bold">Aitah et vastasite</h3>
{#if vastajaNumber % 10 == 0}
	<span class="text-xl font-extrabold text-green-700"
		>Oled {vastajaNumber} vastaja! Horayy!</span
	>
{/if}
<div class="text-md m-4 flex w-full max-w-md flex-col gap-4">
	<table class="w-full rounded-lg border-2 text-left rtl:text-right">
		<thead class="uppercase">
			<tr>
				<th scope="col" class="px-6 py-3">Värvi nimi</th>
				<th scope="col" class="px-6 py-3 text-center">Mehed</th>
				<th scope="col" class="px-6 py-3 text-center">Naised</th>
			</tr>
		</thead>
		<tbody>
			{#each data.varvid as varv}
				<tr class="border-b">
					<th scope="row" class="whitespace-nowrap px-6 py-4 font-medium">
						{varv.name}
					</th>
					<td class="px-6 py-4 text-center">{varv.mehed}</td>
					<td class="px-6 py-4 text-center">{varv.naised}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<a class="w-full rounded-md border-2 p-2 text-center" href="/">Tagasi</a>
</div>
