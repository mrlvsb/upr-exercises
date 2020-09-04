<style>
  button {
    border: 0;
    background: none;
    cursor: pointer;
    font-size: 13px;
    opacity: 0.8;
    outline: none;
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

<div style="position: relative" class="animation">
  <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0; z-index: 2; width: 100%; height: 100%; pointer-events: none;" class="overlay">
    <defs>
      <marker id="head" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6"
        orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>    
  </svg>

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
</div>
