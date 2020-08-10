<script>
  import Array from './array.svelte'
  import State from './state.svelte'
  
  export let array;

	let state = {
		i: -1,
		min: array[0],
    'array[i]': 0
	};

	function next() {
		if(state.i + 1 >= array.length) return false;
		state.i++;
    if(state.min > array[state.i]) {
      state.min = array[state.i];
      state.min_index = state.i;
    }
    return true;
	}

</script>

<State {state} {next} recover={(s) => state = s}>
  <Array array={array} current={state.i} highlight={[state.min_index]} />
</State>

