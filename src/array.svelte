<style>
	table {
		border-collapse: collapse;
	}
  td {
    text-align: center;
  }

	.indexes {
		vertical-align: bottom;
	}
	.values {
		border: 1px solid black;
		background: #5be27a;
		width: 30px;
		height: 30px;
	}
	.arrow {
		display: inline-block;
		text-align: center;
		transition: 300ms;
		position: relative;
		left: 0px;
	}
	
	.current {
		background: #f9f96e;
		font-weight: bold;
	}
	.processed {
		color: #6c757d;
		background: transparent;
	}
  .highlight {
    background: #17a2b8;
    color: black;
  }

  tr td:first-of-type {
    text-align: right;
    padding-right: 4px;
    font-weight: bold;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  export let array;
  export let current;
  export let highlight = [];
  let tds = [];

  onMount(() => {
    console.log(tds[0].offsetLeft)
  });

  import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';

const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
console.log('f');
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
</script>

<br>
<table>
  <tr>
    <td></td>
    <td colspan=4>
      {array.length} items
      <br>
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/ThinBraceUp.svg">
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
		{#each array as value, i (value)}
      <td class="values" class:current={i == current} class:processed={i < current} class:highlight={highlight.indexOf(i) > -1}
        in:receive="{{key: value}}" out:send="{{key: value}}" animate:flip
      >{value}</td>
		{/each}
	</tr>
</table>

<div class="arrow" style="left: {tds && tds[current] ? (tds[current].offsetLeft - (52-33)/2) : 0}px; opacity: {current >= 0 ? 1 : 0}">
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z"/></svg><br>
	current
</div>
