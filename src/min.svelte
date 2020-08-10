<script>
  import Array from './array.svelte'
  import State from './state.svelte'
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
  onMount(() => {
    let dst = svg.querySelector('td.values').getBoundingClientRect();
    let parent = svg.getBoundingClientRect();
    let s = src.getBoundingClientRect();


//    instr = `M ${s.left - parent.left + s.width / 2} ${s.top - parent.top + s.height} L ${dst.x - parent.x} ${dst.y - parent.y}`

    let p1x = s.left - parent.left + s.width / 2;
    let p1y = s.top - parent.top + s.height;
    let p2x = dst.x - parent.x + dst.width / 2;
    let p2y = dst.y - parent.y + dst.height + 5;

    var mpx = (p2x + p1x) * 0.5;
    var mpy = (p2y + p1y) * 0.5;

    // angle of perpendicular to line:
    var theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

    // distance of control point from mid-point of line:
    var offset = 110;

    // location of control point:
    var c1x = mpx + offset * Math.cos(theta);
    var c1y = mpy + offset * Math.sin(theta);

    instr = `M ${p1x} ${p1y} Q ${c1x} ${c1y} ${p2x} ${p2y}`;
    console.log(dst);
  });



</script>

<State {state} {next} recover={(s) => state = s}>
  <div style="position: relative" bind:this={svg}>

    <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 100%; height: 100%; pointer-events: none;">
      <defs>
        <marker id="head" viewBox="0 0 10 10" refX="5" refY="5"
          markerWidth="6" markerHeight="6"
          orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>    
      <path marker-end='url(#head)' d="{instr}" fill="transparent" stroke="black" stroke-width=2 />
    </svg>

    <div style="display: flex;">
      <div style="margin-right: 15px;">
        <Array array={array} current={state.i} highlight={[state.min_index]} />
      </div>
      <div>
      {#if state.i == -1 }
      <div>
        Před průchodem pole si nastavíme minimum a index <strong bind:this={src}>nultého</strong> prvku.


  ```c
  int min = array[0];
  int min_index = 0;
  ```
      </div>
      {:else if state.i == 3}
      Našli jsme nové minimum s hodnotou <strong>{state.min}</strong> na indexu <strong>{state.min_index}</strong>
      {/if}
      </div>
    </div>
  </div>
</State>

