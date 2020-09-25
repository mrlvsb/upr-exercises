<script>
  import ArrayComp from './array.svelte';
  import State from './state.svelte'

  let array = [3, 2, 1, 1, 3, 4, 5, 5, 1];

  let max = Math.max(...array);
  let min = Math.min(...array);
	let state = {
		i: -1,
    _printing: false,
    counters: new Array(max - min + 1).fill(0),
    _result: [],
	};


  function next() {
      if(!state._printing) {
        if(state.i + 1 < array.length) {
          state.i++;
          state.counters[array[state.i] - min]++;
        } else {
          state._printing = true;
          state.i = 0;
        }
      } else {
        if(state.i < state.counters.length) {
          if(state.counters[state.i]) {
            state._result = [...state._result, state.i + min];
            state.counters[state.i]--;
          } else {
            state.i++;
            if(state.i >= state.counters.length) {
              state.i = undefined;
              return false;
            }
          }
        }
      }
      return true;
  }

</script>


<State {state} {next} recover={(s) => state = s}>
  <ArrayComp {array} current={!state._printing ? state.i : undefined} />
  <ArrayComp array={state.counters} current={state._printing ? state.i : undefined} />

  <div>
    {state._result.join(' ')}
  </div>
</State>
