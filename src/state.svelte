<style>
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
  export let state;
  export let next;
  export let recover;

	let history = [];
	
	function go_next() {
    let current = JSON.parse(JSON.stringify(state)); 
    if(!next()) {
      return;
    }

		history.push(current);
	}
	
	function go_prev() {
		if(!history.length) return;
		state = history.pop();
    recover(state);
	}

</script>


<button on:click="{go_prev}">❮</button>
<button on:click="{go_next}">❯</button>

<slot>
No content
</slot>

<br>
{#each Object.entries(state) as [obj, val]}
	{obj} = {val}<br>
{/each}
<br>
