<script>
export let from = 0;
export let to = 0;
export let src;
export let extension = "svg";
let current = 0;
</script>

<style>
  object {
    display: none;
    height: 100%;
  }
  object.active {
    display: block;
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

<div style="height: 100%;">
  <button on:click={() => current = Math.max(0, current - 1)} disabled={current <= 0}>❮</button>
  <button on:click={() => current = Math.min(to, current + 1)} disabled={current >= to}>❯</button>

  <div style="height: 100%;">
  {#each {length: parseInt(to) - parseInt(from) + 1} as _, num}
    <object data="{src}{num}.{extension}" class:active={current === num}></object>
  {/each}
  </div>
</div>
