<script>
  import Array from './array.svelte'
  import State from './state.svelte'
  import Code from './Code.svelte'
  import { onMount } from 'svelte';

  export let array;

  let src;

	let state = {
		i: -1,
		min: array[0],
    'array[i]': 0,
    'min_index': 0,
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

  let instr = "";
  let svg;



</script>

<State {state} {next} recover={(s) => state = s}>
  <div style="position: relative" bind:this={svg}>
    <div style="display: flex;">
      <div style="margin-right: 15px;">
        <Array array={array} current={state.i} highlight={[state.min_index]} />
      </div>
      <div>
      {#if state.i == -1 }
      <div>
        Před průchodem pole si nastavíme minimum a index <upr-arrow src-anchor="south" dst=".index-0" dst-anchor="south" ctrl-distance="150"><strong>nultého</strong></upr-arrow> prvku.
<Code>
int min = array[0];
int min_index = 0;
</Code>
      </div>
      {:else if state.i == 3}
      Našli jsme nové minimum s hodnotou <strong>{state.min}</strong> na indexu <upr-arrow src-anchor="south" dst=".index-3" dst-anchor="south" ctrl-distance="150"><strong>{state.min_index}</strong></upr-arrow>
      {/if}
      </div>
    </div>
  </div>
</State>

