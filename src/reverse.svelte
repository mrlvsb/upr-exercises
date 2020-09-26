<script>
  import Array from './array.svelte'
  import State from './state.svelte'

  export let array;

	let state = {
		_array: array,
		i: -1,
	};

	function next() {
		state.i++;
    let tmp = state._array[state.i];
    state._array[state.i] = state._array[array.length - state.i - 1];
    state._array[array.length - state.i - 1] = tmp;
    return state.i + 1 < array.length / 2;
	}

</script>

<State {state} {next} recover={(s) => state = s}>
  <div style="display: flex">
    <div>
      <Array array={state._array} current={state.i} key={(val, i) => val} />
    </div>
    <div>
    {#if state.i + 1 >= state._array.length / 2}
    Konec v půlce pole ({state._array.length / 2}), jinak bychom prohodili prvky zpět.

    {/if}
    </div>
  </div>
</State>

