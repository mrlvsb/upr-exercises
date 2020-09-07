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
registerAnimation('arrow', require('./arrow.svelte'));
registerAnimation('container', require('./container.svelte'));

registerAnimation('array', require('./array.svelte'));
registerAnimation('array-min', require('./min.svelte'));
registerAnimation('array-reverse', require('./reverse.svelte'));
registerAnimation('array-sum', require('./sum.svelte'));

registerAnimation('matrix', require('./matrix.svelte'));
registerAnimation('matrix-mul', require('./matrix_mul.svelte'));
