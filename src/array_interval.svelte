<script>
  import Array from './array.svelte'
  import State from './state.svelte'
  import Code from './Code.svelte'
  import { onMount } from 'svelte';

  export let array;
  export let from;
  export let to = from;

  let state = {
      i: -1,
      count: 0,
      len: array.length,
      _highlight: {},
  };

  if(from === to) {
    state.num = from;
  } else {
    state.from = from;
    state.to = to;
  }

	function next() {
		if(state.i + 1 >= array.length) return false;
		state.i++;
    if(array[state.i] >= from && array[state.i] <= to) {
      state._highlight[state.i] = 'active';
      state.count++;
    }
    if(state.min > array[state.i]) {
      state.min = array[state.i];
      state.min_index = state.i;
    }
    return true;
	}
</script>


<State {state} {next} recover={(s) => state = s}>
  <div style="display: flex;">
    <div style="margin-right: 15px;">
      <Array array={array} current={state.i} highlight={state._highlight} />
    </div>
  </div>
</State>

