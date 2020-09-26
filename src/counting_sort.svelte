<script>
  import ArrayComp from './array.svelte';
  import State from './state.svelte'

  let array = [3, 2, 1, 1, 3, 4, 5, 5, 1];

  let max = Math.max(...array);
  let min = Math.min(...array);
	let state = {
		i: -1,
    _printing: false,
    _counters: new Array(max - min + 1).fill(0),
    _result: [],
	};


  function next() {
      if(!state._printing) {
        if(state.i + 1 < array.length) {
          state.i++;
          state._counters[array[state.i] - min]++;
        } else {
          state._printing = true;
          state.i = 0;
        }
      } else {
        if(state.i < state._counters.length) {
          if(state._counters[state.i]) {
            state._result = [...state._result, state.i + min];
            state._counters[state.i]--;
          } else {
            state.i++;
            if(state.i >= state._counters.length) {
              state.i = -1;
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
  <ArrayComp array={state._counters} current={state._printing ? state.i : undefined} />

  <div>
   {state._result.join(' ')}
  </div>
</State>
