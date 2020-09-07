<style>
div {
  position: relative;
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>

<script>
import {onMount} from 'svelte';
  let el;

  onMount(function() {
      el.appendChild(document.createElement('slot'));
  });
</script>

<div class="animation" bind:this={el}>
  <svg xmlns="http://www.w3.org/2000/svg" class="overlay">
    <defs>
      <marker id="head" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6"
        orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>
  </svg>
</div>
