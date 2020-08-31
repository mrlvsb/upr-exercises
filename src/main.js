function registerAnimation(elementName, cls) {
  customElements.define(`upr-${elementName}`, class extends HTMLElement {
    connectedCallback() {
      let attrs = {};
      for(let i = 0; i < this.attributes.length; i++) {
        let attr = this.attributes[i];
        attrs[attr.name] = JSON.parse(attr.value);
      }

      new cls({
        target: this,
        props: attrs,
      });
    }
  })
}

registerAnimation('all', require('./App.svelte'));

registerAnimation('array', require('./array.svelte'));
registerAnimation('array-min', require('./min.svelte'));
registerAnimation('array-reverse', require('./reverse.svelte'));
registerAnimation('array-sum', require('./sum.svelte'));

registerAnimation('array-matrix', require('./matrix.svelte'));
registerAnimation('array-matrix-mul', require('./matrix_mul.svelte'));
