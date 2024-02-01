class Styleguide {
  constructor() {
    this.init();
  }

  async init() {
    this.index = await this.fetchIndex();
    this.renderNavigation();
  }

  renderNavigation() {
    const nav = document.createElement('nav');
    nav.classList.add('styleguide-nav');
    nav.innerHTML = `<ul class="styleguide-nav__list">
      ${this.index.data.map((item) => `<li class="styleguide-nav__list-item">
        <a class="styleguide-nav__link"href="${item.path}.plain.html">${item.path}</a>
      </li>`).join('')}
    </ul>`;
    document.body.insertBefore(nav, document.body.firstChild);
  }

  async fetchIndex() {
    const response = await fetch(`${window.hlx.codeBasePath}/query-index.json`);
    const json = await response.json();
    return json;
  }
}

export default new Styleguide();