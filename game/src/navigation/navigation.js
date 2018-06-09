import style from './styles/navStyle.css';

export default class Navigation {
  constructor(heading, links = []) {
    this.heading = heading;
    this.links = links;
  }

  addHandlers() {
    document.addEventListener('click', this.selectElement);
  }

  removeHandlers() {
    document.removeEventListener('click', this.selectElement);
  }

  bindThis() {
    this.selectElement = this.selectElement.bind(this);
  }

  selectElement(e) {
    const target = e.target;
    const selectedElement = target.closest('.nav-item');

    if (!selectedElement) return;

    const targetId = target.getAttribute('data-index');

    this.removeHandlers();
    this.component.remove();

    return targetId;
  }

  render() {
    const div = this.createElement('div', 'nav');
    const header = this.createElement('h2', 'nav-header', this.heading);
    const ul = this.createElement('ul', 'nav-list');

    this.links.forEach((link, index) => {
      const li = this.createElement('li', 'nav-item', link);
      li.innerHTML = link;
      li.setAttribute('data-id', index + 1);
      ul.appendChild(li);
    })
    
    div.appendChild(header);
    div.appendChild(ul);
    this.component.appendChild(div);
    document.body.appendChild(this.component);
  }

  createElement(tag, className, text) {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    if (text) {
      elem.innerHTML = text;
    }
    return elem;
  }

  init() {
    this.component = this.createElement('div', 'nav-wrapper');

    this.bindThis();
    this.addHandlers();

    this.render();
  }
}
