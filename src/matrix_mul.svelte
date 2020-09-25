<script>
import Matrix from './matrix.svelte'
import State from './state.svelte'

export let a;
export let b;

let rows = a.length;
let cols = b[0].length;

let state = {
  _c: Array.from(Array(rows), () => new Array(cols)),
  row: 0,
  col: 0,
  el: -1,
};

function next() {
  if(state.row >= rows) {
    return false;
  }
  state.el++;
  if(state.el >= a[0].length) {
    state.el = 0;
    state.col++;
    if(state.col >= cols) {
      state.col = 0;
      state.row++;
      if(state.row >= rows) {
        return false;
      }
    }
  }

  if(state.el == 0) {
    state._c[state.row][state.col] = 0;
  }

  state._c[state.row][state.col] += a[state.row][state.el] * b[state.el][state.col];

  return true;
}
</script>

<State {state} {next} recover={(s) => state = s}>
  <div style="display: flex; align-items: center">
    <Matrix elements={a} highlight={[state.row, state.el]} />
    <span style="align-self: center; padding: 5px;">x</span>
    <Matrix elements={b} highlight={[state.el, state.col]} />
    <span style="align-self: center; padding: 5px;">=</span>
    <div class="result">
     <Matrix elements={state._c} highlight={[state.row, state.col]} />
    </div>
  </div>

{#if state.el >= 0 && state.row < rows}
  <div style="text-align: center">
    <upr-arrow dst=".result .matrix-{state.row}-{state.col}" dst-anchor="south" src-anchor="north">
    {#each {length: state.el + 1} as _, el}
      {a[state.row][el]} * {b[el][state.col]}
      {#if el != state.el}
      +
      {/if}
    {/each}
    = {state._c[state.row][state.col]}
    </upr-arrow>
  </div>
{/if}
</State>


