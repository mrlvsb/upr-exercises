<script>
  import Array from './array.svelte'
  import State from './state.svelte'
  
  export let array;

	let state = {
		array: array,
		i: -1,
		min: array[0],
    'array[i]': 0
	};

	function next() {
		if(state.i + 1 >= state.array.length / 2) return false;
		state.i++;
    let tmp = state.array[state.i];
    state.array[state.i] = state.array[array.length - state.i - 1];
    state.array[array.length - state.i - 1] = tmp;
    return true;
	}

</script>

<State {state} {next} recover={(s) => state = s}>
  <div style="display: flex">
    <div>
      <Array array={state.array} current={state.i} />
    </div>
    <div>
    {#if state.i + 1 >= state.array.length / 2}
    Konec v půlce pole ({state.array.length / 2}), jinak bychom prohodili prvky zpět.

    {/if}
    </div>
  </div>
</State>

