<script>
  import Array from './array.svelte'
  import State from './state.svelte'
  
  export let array;

	let state = {
		i: -1,
		sum: 0,
    'array[i]': 0
	};

	function next() {
		if(state.i + 1 >= array.length) return false;
		state.i++;
		state.sum += array[state.i];
    state['array[i]'] = array[state.i];
    return true;
	}

</script>

<State {state} {next} recover={(s) => state = s}>
  <Array array={array} current={state.i} />
</State>

