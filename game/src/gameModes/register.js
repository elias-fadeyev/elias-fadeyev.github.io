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
    this.input.required = true;
  }

  addHandlers() {
    this.form.addEventListener('submit', this.submitAnswer.bind(this)); 
  }

  submitAnswer(e) {
    this.name = this.input.value;

    e.preventDefault();
  }

  getName() {
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
    this.addHandlers();
  }

  init() {
    this.render();
  }
}