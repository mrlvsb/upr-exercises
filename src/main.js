function registerAnimation(elementName, cls) {
  customElements.define(`upr-${elementName}`, class extends HTMLElement {
    connectedCallback() {
      let attrs = {};
      for(let i = 0; i < this.attributes.length; i++) {
        let attr = this.attributes[i];
        let name = attr.name.replace('-', '_')
        if(attr.value[0] == '{' || attr.value[0] == '[') {
          attrs[name] = JSON.parse(attr.value);
        } else {
          attrs[name] = attr.value;
        }
      }
      /*
      let childs = Array.from(this.childNodes);
      function slot() {
        return [function() {
          return {
            c: () => {},
            m: (target, anchor) => {
              console.log(target, anchor, this)
              childs.forEach(el => {
                console.log(el);
                el.remove();
                target.appendChild(el);
              });
            },
            d: () => {},
            l: () => {},
          };
        }]
      }
*/
      new cls({
        target: this,
        props: {...attrs,
  //            $$slots: {
    //            default: slot(),
      //        },
        //      $$scope: {},
        }
      });
    }
  })
}
registerAnimation('all', require('./App.svelte'));
customElements.define('upr-arrow', require('./arrow.js'));
customElements.define('upr-container', class extends HTMLElement {
  connectedCallback() {
    this.style.position = 'relative';
    this.classList.add('animation');
    this.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" class="overlay" style="position: absolute; top: 0; left: 0; z-index: 2; width: -moz-fit-content; width: fit-content; height: 100%; pointer-events: none">
    <defs>
      <marker id="head" viewBox="0 0 10 10" refX="5" refY="5"
        markerWidth="6" markerHeight="6"
        orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>
  </svg>
  `;
  }
});
registerAnimation('svgs', require('./svgs.svelte'));


registerAnimation('array', require('./array.svelte'));
registerAnimation('array-min', require('./min.svelte'));
registerAnimation('array-reverse', require('./reverse.svelte'));
registerAnimation('array-sum', require('./sum.svelte'));

registerAnimation('matrix', require('./matrix.svelte'));
registerAnimation('matrix-mul', require('./matrix_mul.svelte'));
