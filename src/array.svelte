<style>
	table {
		border-collapse: collapse;
	}
	td {
		width: 30px;
		height: 30px;
		text-align: center;
	}
	.indexes {
		vertical-align: bottom;
	}
	.values td {
		border: 1px solid black;
		background: #28a745;
	}
	.arrow {
		display: inline-block;
		text-align: center;
		transition: 10ms;
	}
	
	.values .current {
		background: yellow;
		font-weight: bold;
	}
	.values .processed {
		color: #6c757d;
		background: transparent;
	}
</style>

<script>
  export let array;
  export let current;
</script>

<table>
	<tr class="indexes">
		{#each array as _, i}
		<td>{i}</td>
		{/each}
	</tr>
	<tr class="values">
		{#each array as value, i}
      <td class:current={i == current} class:processed={i < current}>{value}</td>
		{/each}
	</tr>
</table>

<div class="arrow" style="margin-left: {current * 30}px">
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z"/></svg><br>
	current
</div>
