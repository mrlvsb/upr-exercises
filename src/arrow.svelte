<script>
import { onDestroy } from 'svelte';

export let src = null;
export let dst = null;

let child;
let path;
let svg;
let appended = false;


onDestroy(() => {
  if(svg && path) {
    svg.removeChild(path);
  }
});

$: {
  if((src || dst) && child) {
    let container = child.closest('.animation');

    if(!src) {
      src = child;
    }
    if(!dst) {
      dst = child;
    }

    if(typeof dst === 'string' || dst instanceof String) {
      dst = container.querySelector(dst); 
    }

    svg = container.querySelector('svg.overlay');
    let parent = svg.getBoundingClientRect();
    let d = dst.getBoundingClientRect();
    let s = src.getBoundingClientRect();

    let p1x = s.left + s.width / 2 - parent.left;
    let p1y = s.top + s.height - parent.top;
    let p2x = d.x + d.width / 2 - parent.left;
    let p2y = d.y + d.height + 5 - parent.top;

    var mpx = (p2x + p1x) * 0.5;
    var mpy = (p2y + p1y) * 0.5;

    // angle of perpendicular to line:
    var theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

    // distance of control point from mid-point of line:
    var offset = 110;

    // location of control point:
    var c1x = mpx + offset * Math.cos(theta);
    var c1y = mpy + offset * Math.sin(theta);

    let instr = `M ${p1x} ${p1y} Q ${c1x} ${c1y} ${p2x} ${p2y}`;

    if(!path) {
      path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    }
    path.setAttribute("d", instr);
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    if(!appended) {
      appended = true;
      svg.appendChild(path);
    }
  }
}
</script>


<span bind:this={child}>
<slot></slot>
</span>
