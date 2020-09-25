<script>
  import Code from './Code.svelte';
	const scale = 20;
	const max_x = 10;

	let a = 1;
	let b = 0;
	let c = 0;

	let roots = [];
	let path;

	function y(x) {
		return a*x*x + b*x + c;
	}

	function coord(x) {
		return `${scale * x},${scale * y(x)}`;
	}

	$: {
		let y0 = 2 * y(0) - y(-max_x)/2 - y(max_x)/2;
		path = `M${coord(-max_x)} Q0,${scale * y0} ${coord(max_x)}`;
		const D = b*b - 4 * a * c;
		roots = [];
		if(D == 0) {
			roots.push(-b/(2*a));
		} else if(D > 0) {
			roots.push((-b + Math.sqrt(D))/(2*a));
			roots.push((-b - Math.sqrt(D))/(2*a));
		}
    roots = roots;
	}
</script>

<style>
  input {
    max-width: 30px;
    border: 0;
    text-align: center;
    background: transparent;
  }
</style>

<button on:click={() => [a, b, c] = [1, 2, 3]}>žádný kořen</button>
<button on:click={() => [a, b, c] = [4, 8, 4]}>jeden kořen</button>
<button on:click={() => [a, b, c] = [2, 9, 4]}>dva kořeny</button>

<pre class="hljs" style="display: block">
<span class="hljs-keyword">float</span> x1, x2;
<span class="hljs-keyword">int</span> roots = quadratic_roots(<input bind:value={a} type="number">, <input bind:value={b} type="number">, <input bind:value={c} type="number">, &amp;x1, &amp;x2);
<span class="hljs-built_in">printf</span>(<span class="hljs-string">"roots: %d\n"</span>); <span class="hljs-comment">// roots: {roots.length}</span>
<span class="hljs-built_in">printf</span>(<span class="hljs-string">"x1 = %f\n"</span>, x1); <span class="hljs-comment">// x1 = {(roots[0] || 0).toFixed(2)}</span>
<span class="hljs-built_in">printf</span>(<span class="hljs-string">"x2 = %f\n"</span>, x2); <span class="hljs-comment">// x2 = {(roots[1] || roots[0] || 0).toFixed(2)}</span>
</pre>

<svg height="400" viewBox="0 0 400 400" width="400">
    <defs>
        <pattern height="20" id="grid" patternUnits="userSpaceOnUse" width="20">
            <rect fill="white" height="21" stroke="gray" stroke-width="-.5" width="21"></rect>
        </pattern>
    </defs>
    <rect height="800" width="800" y="0"></rect>
    <rect fill="url(#grid)" height="800" width="800" y="0"></rect>
    <g transform="translate(0,0) scale(1, 1)">
        <line x1="-200" x2="800" y1="200" y2="200" stroke="black"></line>
        <text text-anchor="start" dx="17" textLength="173" x="200" y="214"> 1 2 3 4 5 6 7 8 9</text>
        <text text-anchor="end" dx="-17" textLength="173" x="200" y="214">-9 -8 -7 -6 -5 -4 -3 -2 -1</text>
        <line stroke="black" strokeWidth="2" x1="200" x2="200" y1="-200" y2="800"></line>
    </g>
    <g transform="translate(200, 200) scale(1, -1)">
        <path d={path} fill="none" stroke="black" stroke-width=3></path>
				{#each roots as x}
					<circle cx={20*x} cy={y(x)} r=4 />
				{/each}
    </g>
</svg>
