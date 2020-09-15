<script>
export let from = 0;
export let to;
export let src;
let current = 0;
</script>

<style>
  object {
    position: absolute;
    opacity: 0;
    left: 10000;
    z-index: 10;
  }
  object.active {
    opacity: 1;
    left: 0;
    top: 0;
  }
  button {
    border: 0;
    background: none;
    cursor: pointer;
    font-size: 13px;
    opacity: 0.8;
    outline: none;
  }

  button:hover {
    opacity: 1;
  }

  button[disabled] {
    cursor: default;
  }
</style>

<div>
  <button on:click={() => current = Math.max(0, current - 1)} disabled={current <= 0}>❮</button>
  <button on:click={() => current = Math.min(to, current + 1)} disabled={current >= to}>❯</button>

  <div style="position: relative">
  {#each {length: parseInt(to) + 1} as _, num}
    <object data="{src}{num}.svg" class:active={current == num}></object>
  {/each}
  </div>
</div>
