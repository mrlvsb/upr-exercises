<script>
import {onMount} from 'svelte'

let node;

onMount(() => {
  if(window.hljs) {
    window.hljs.highlightBlock(node);
  }
});

</script>

<pre>
  <code class="language-c" bind:this={node}>
    <slot></slot>
  </code>
</pre>
