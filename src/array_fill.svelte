<script>
  import ArrayComp from './array.svelte';

  let start = 10;
  let increment = 5;
  let len = 8;

  $: array = new Array(len).fill(0).map((_, i) => i*increment + start);
</script>

<style>
input {
  max-width: 40px;
  border: 0;
  text-align: center;
  background: transparent;
}

</style>

<pre style="display: block">
<span class="hljs-keyword">int</span> nums[<input bind:value={len} type="number" min=1 max=13 />];
fill_array(nums, <span class="hljs-keyword">sizeof</span>(nums), <span class="hljs-number"><input bind:value={start} type=number></span>, <span class="hljs-number"><input bind:value={increment} type=number></span>);
</pre>

<ArrayComp {array}></ArrayComp>
