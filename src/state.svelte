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

  button[disabled] {
    cursor: default;
  }
</style>

<script>
  export let state;
  export let next;
  export let recover;

	let history = [];
  let finished = false;
	
	function go_next() {
    let current = JSON.parse(JSON.stringify(state)); 
    if(!next()) {
      finished = true;
      return;
    }

    history = [...history, current];
	}
	
	function go_prev() {
		if(!history.length) return;
		state = history.pop();
    history = history;
    finished = false;
    recover(state);
	}

</script>


<button on:click="{go_prev}" disabled="{!history.length}">❮</button>
<button on:click="{go_next}" disabled="{finished}">❯</button>

<slot>
No content
</slot>

<br>
{#each Object.entries(state) as [obj, val]}
	{obj} = {val}<br>
{/each}
<br>
