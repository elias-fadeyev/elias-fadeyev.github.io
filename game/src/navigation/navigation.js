import style from './styles/navStyle.css';

export default class Navigation {
  constructor(heading, links = []) {
    this.heading = heading;
    this.links = links;

    this.selectedElementIndex = 0;
  }

  addHandlers() {
    document.addEventListener('keydown', this.selectElement);
  }

  removeHandlers() {
    document.removeEventListener('keydown', this.selectElement);
  }

  bindThis() {
    this.selectElement = this.selectElement.bind(this);
  }

  selectElement(e) {
    const keyCode = e.keyCode;

    if (keyCode === 38) {
      this.selectedElementIndex -= 1;

      if (this.selectedElementIndex < 0) {
        this.selectedElementIndex = this.elements.length - 1;
      }
      this.elements[this.selectedElementIndex].focus();
    } else if (keyCode === 40) {
      this.selectedElementIndex += 1;

      if (this.selectedElementIndex > this.elements.length - 1) {
        this.selectedElementIndex = 0;
      }
      this.elements[this.selectedElementIndex].focus();
    } else if (keyCode === 13) {
      this.targetId = this.elements[this.selectedElementIndex].dataset.id;

      this.removeHandlers();
      this.component.remove();
    }
  }

  getTargetId() {
    return this.targetId;
  }

  isSelected() {
    if (!this.targetId) {
      return false;
    }
    return true;
  }

  render() {
    const div = this.createElement('div', 'nav');
    const header = this.createElement('h2', 'nav-header', this.heading);
    const ul = this.createElement('ul', 'nav-list');

    this.links.forEach((link, index) => {
      const li = this.createElement('li', 'nav-item');
      const element = this.createElement('button', 'link-item', link);
      element.innerHTML = link;
      element.setAttribute('data-id', index);

      li.appendChild(element);
      ul.appendChild(li);
    })
    
    div.appendChild(header);
    div.appendChild(ul);
    this.component.appendChild(div);
    document.body.appendChild(this.component);

    this.elements = this.component.querySelectorAll('.link-item');

    this.elements[this.selectedElementIndex].focus();
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
