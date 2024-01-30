export class Icon extends HTMLElement {
  shadowRoot;

  constructor() {
    super();
    this.shadowRoot = this.shadowRoot || this.attachShadow({mode: "open"})
  }

  get src() {
    const srcValue = this.getAttribute('src');
    if (!srcValue) {
      throw new Error('Icon must have a src attribute');
    }
    return srcValue;
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const svg = await this.fetchIcon();
    this.shadowRoot.innerHTML = `<style>:host{display:inline-block;width:50px;height:50px;}svg{display:inline-block;width:100%;height:100%;fill:currentColor;}</style>${svg}`;
  }

  async fetchIcon() {
    const response = await fetch(this.src);
    const textResponse = await response.text();
    return textResponse;
  }
}

