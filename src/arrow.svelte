<script>
import { onDestroy, onMount } from 'svelte';

export let src = null;
export let dst = null;
export let ctrldistance = 110;
export let src_anchor = "center";

let child;
let path;
let svg;
let appended = false;
let refresh = 0;


onDestroy(() => {
  if(svg && path) {
    svg.removeChild(path);
  }
});

$: {
  if((src || dst) && child && refresh !== undefined) {
    let container = child.closest('.animation') || document;
      console.log('x');

    if(!src) {
      src = child.parentNode;
      setTimeout(() => refresh = 1, 0);
    }
    if(!dst) {
      dst = child.parentNode;
    }

    if(typeof dst === 'string' || dst instanceof String) {
      dst = container.querySelector(dst);
    }
    if(typeof src === 'string' || src instanceof String) {
      src = container.querySelector(src);
    }

    svg = container.querySelector('svg.overlay');
    let parent = svg.getBoundingClientRect();
    let d = dst.getBoundingClientRect();
    let s = src.getBoundingClientRect();

    let p1x = s.left - parent.left;
    let p1y = s.top - parent.top;
    switch(src_anchor) {
      case "north":
          p1x += s.width / 2;
          break;
      case "south":
          p1x += s.width / 2;
          p1y += s.height;
          break;
      case "east":
          p1x += s.width;
          p1y += s.height / 2;
          break;
      case "west":
          p1y += s.height / 2;
          break;
      case "north east":
          p1x += s.width;
          break;
      case "south east":
          p1x += s.width;
          p1y += s.height;
          break;
      case "south west":
          p1y += s.height;
          break;
      case "north west":
          break;
      case "center":
          p1x += s.width / 2;
          p1y += s.height / 2;
          break;
      default:
          console.log(`Unknown anchor: ${src_anchor}`)
    }

    let p2x = d.x + d.width / 2 - parent.left;
    let p2y = d.y + d.height + 5 - parent.top;

    var mpx = (p2x + p1x) * 0.5;
    var mpy = (p2y + p1y) * 0.5;

    // angle of perpendicular to line:
    var theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

    // location of control point:
    var c1x = mpx + ctrldistance * Math.cos(theta);
    var c1y = mpy + ctrldistance * Math.sin(theta);

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

<style>
@keyframes dash {
  to {
    stroke-dashoffset: 0;
    marker-end: url(#head);
  }
}

:global(svg.overlay path) {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 1s linear forwards;
}
</style>

<span bind:this={child}>
<slot></slot>
</span>
