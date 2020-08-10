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
		if(state.i + 1 >= array.length / 2) return false;
		state.i++;
    let tmp = array[state.i];
    array[state.i] = array[array.length - state.i - 1];
    array[array.length - state.i - 1] = tmp;
    return true;
	}

</script>

<State {state} {next} recover={(s) => state = s}>
  <Array array={array} current={state.i} />
</State>

