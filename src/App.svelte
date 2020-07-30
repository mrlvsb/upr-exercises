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

  button {
    border: 0;
    background: none;
    cursor: pointer;
    font-size: 13px;
    opacity: 0.8;
  }

  button:hover {
    opacity: 1;
  }
</style>

<script>
	let array = [10, 20, 30, 40];
	let state = {
		i: -1,
		sum: 0,
	};
	let history = [];
	
	function next() {
		if(state.i + 1 >= array.length) return;
		history.push(JSON.parse(JSON.stringify(state)));
		state.i++;
		state.sum += array[state.i];
	}
	
	function prev() {
		if(!history.length) return;
		state = history.pop();
	}
</script>

# Pole (array)
## Suma prvků
Funkce projde pole a spocita sumu.
```c
int suma(int *pole, int len);
```

<button on:click="{prev}">❮</button>
<button on:click="{next}">❯</button>

<table>
	<tr class="indexes">
		{#each array as _, i}
		<td>{i}</td>
		{/each}
	</tr>
	<tr class="values">
		{#each array as value, i}
      <td class:current={i == state.i} class:processed={i < state.i}>{value}</td>
		{/each}
	</tr>
</table>

<div class="arrow" style="margin-left: {state.i*30}px">
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z"/></svg><br>
	current
</div>
<br>
{#each Object.entries(state) as [obj, val]}
	{obj} = {val}<br>
{/each}
array[i] = {array[state.i]}
<br>
