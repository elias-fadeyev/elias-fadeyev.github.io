export default class Register {
  createElement(tag, className, text) {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    if (text) {
      elem.innerHTML = text;
    }
    return elem;
  }

  createAllElements() {
    this.component = this.createElement('div', 'register-block');

    this.wrapper = this.createElement('div', 'register-wrapper');
    this.header = this.createElement('h2', 'register-header', 'Введи имя:');
    
    this.form = this.createElement('form', 'form');
    this.input = this.createElement('input', 'name-input');
    this.input.placeholder = 'Скрудж';
  }

  getName() {
    this.name = this.input.value || 'Скрудж';
    return this.name;
  }

  remove() {
    this.wrapper.remove();
  }

  render() {
    this.createAllElements();

    this.form.appendChild(this.input);
    this.component.appendChild(this.header);
    this.component.appendChild(this.form);
    this.wrapper.appendChild(this.component);
    document.body.appendChild(this.wrapper);

    this.input.focus();
  }

  init() {
    this.render();
  }
}