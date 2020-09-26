<style>
	table {
		border-collapse: collapse;
    margin: 0;
	}
  td {
    text-align: center;
    padding: 0;
    border: 0;
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
  .highlight-active {
    background: #17a2b8;
    color: black;
  }
  .highlight-muted {
    background: #9a9da0;
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
  import { plural } from './utils.js';
  import Bracket from './bracket.svelte';

  export let array = [];
  export let current = null;
  export let highlight = [];
  export let showArrow = true;
  export let key = (val, i) => (val, i);
  let tds = [];

  import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';

const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
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
    <td colspan={array.length} style="white-space: nowrap">
      {plural(array.length, "1", `${array.length} prvky`, `${array.length} prvků`)}
      <div style="padding-left: 10px;">
        <Bracket dir="up" width={30*array.length - 10} />
      </div>
    </td>
  </tr>
	<tr class="indexes">
    <td>indexy</td>
		{#each array as _, i}
		<td bind:this={tds[i]}>{i}</td>
		{/each}
	</tr>
	<tr>
    <td>hodnoty</td>
		{#each array as value, i (key(value, i))}
      <td width="30" class="values index-{i} {highlight[i] ? 'highlight-' + highlight[i] : ''}" class:current={i == current} class:processed={i < current}
        in:receive="{{key: value}}" out:send="{{key: value}}" animate:flip
      >{value}</td>
		{/each}
	</tr>
</table>

{#if current != null}
<div class="arrow" style="left: {tds && tds[current] ? (tds[current].offsetLeft - (52-33)/2) : 0}px; opacity: {current >= 0 ? 1 : 0}">
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z"/></svg><br>
	current
</div>
{/if}
