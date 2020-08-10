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
	.values {
		border: 1px solid black;
		background: #28a745;
	}
	.arrow {
		display: inline-block;
		text-align: center;
		transition: 10ms;
	}
	
	.current {
		background: yellow;
		font-weight: bold;
	}
	.processed {
		color: #6c757d;
		background: transparent;
	}
  .highlight {
    background: blue;
    color: red;
  }

  tr td:first-of-type {
    text-align: right;
    padding-right: 4px;
  }
</style>

<script>
  import { onMount } from 'svelte';
  export let array;
  export let current;
  export let highlight = [];
  let tds = [];

  onMount(() => {
    console.log(tds[0].offsetLeft)
  });
</script>

<br>
<table>
  <tr>
    <td></td>
    <td colspan=4>
      {array.length} items
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/GullBraceDown.svg" style="width: 100%">
    </td>
  </tr>
	<tr class="indexes">
    <td>indexes</td>
		{#each array as _, i}
		<td bind:this={tds[i]}>{i}</td>
		{/each}
	</tr>
	<tr>
    <td>values</td>
		{#each array as value, i}
      <td class="values" class:current={i == current} class:processed={i < current} class:highlight={highlight.indexOf(i) > -1}>{value}</td>
		{/each}
	</tr>
</table>

<div class="arrow" style="margin-left: {tds && tds[current] && (tds[current].offsetLeft - (52-33)/2)}px; background: red">
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z"/></svg><br>
	current
</div>
