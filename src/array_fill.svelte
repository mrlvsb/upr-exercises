<script>
  import ArrayComp from './array.svelte';

  export let start = 10;
  export let increment = 5;
  export let len = 8;
  export let max_len = 17;

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
<span class="hljs-keyword">int</span> nums[<input bind:value={len} type="number" min=1 max={max_len} />];
fill_array(nums, <input bind:value={len} type="number" min=1 max={max_len} />, <span class="hljs-number"><input bind:value={start} type=number></span>, <span class="hljs-number"><input bind:value={increment} type=number></span>);
</pre>

<ArrayComp {array}></ArrayComp>
