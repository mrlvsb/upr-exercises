function moveToAnchor(x, y, width, height, anchor) {
  switch(anchor) {
    case "north":
        x += width / 2;
        break;
    case "south":
        x += width / 2;
        y += height;
        break;
    case "east":
        x += width;
        y += height / 2;
        break;
    case "west":
        y += height / 2;
        break;
    case "north east":
        x += width;
        break;
    case "south east":
        x += width;
        y += height;
        break;
    case "south west":
        y += height;
        break;
    case "north west":
        break;
    case "center":
        x += width / 2;
        y += height / 2;
        break;
    default:
        console.log(`Unknown anchor: ${anchor}`)
  }
  return [x, y];
}

export default class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    setTimeout(() => this.calculateArrow(), 0);
  }

  calculateArrow() {
    const container = this.closest('.animation') || document;
    const svg = container.querySelector('svg.overlay');

    let src = this.getAttribute('src') || this;
    let dst = this.getAttribute('dst') || this;
    const src_anchor = this.getAttribute('src-anchor') || 'center';
    const dst_anchor = this.getAttribute('dst-anchor') || 'center';
    const ctrl_distance = this.getAttribute('ctrl-distance') || 0;


    if(typeof dst === 'string' || dst instanceof String) {
      dst = container.querySelector(dst);
    }
    if(typeof src === 'string' || src instanceof String) {
      src = container.querySelector(src);
    }


    const parent = svg.getBoundingClientRect();

    const s = src.getBoundingClientRect();
    const [p1x, p1y] = moveToAnchor(
      s.left - parent.left,
      s.top - parent.top,
      s.width,
      s.height,
      src_anchor
    );

    const d = dst.getBoundingClientRect();
    const [p2x, p2y] = moveToAnchor(
      d.left - parent.left,
      d.top - parent.top,
      d.width,
      d.height,
      dst_anchor
    );

    const mpx = (p2x + p1x) * 0.5;
    const mpy = (p2y + p1y) * 0.5;

    // angle of perpendicular to line:
    const theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

    // location of control point:
    const c1x = mpx + ctrl_distance * Math.cos(theta);
    const c1y = mpy + ctrl_distance * Math.sin(theta);

    let instr = `M ${p1x} ${p1y} Q ${c1x} ${c1y} ${p2x} ${p2y}`;

    if(!this.path) {
      this.path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    }
    this.path.setAttribute("d", instr);
    this.path.setAttribute("stroke", "black");
    this.path.setAttribute("stroke-width", "2");
    this.path.setAttribute("fill", "none");
    this.path.setAttribute("marker-end", "url(#head)");
    svg.appendChild(this.path);
  }

  static get observedAttributes() {
    return ['src', 'dst'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.calculateArrow();
  }

  disconnectedCallback() {
    if(this.path) {
      this.path.remove();
    }
  }

};
