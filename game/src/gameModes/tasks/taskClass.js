export default class Task {
  constructor() {
    this.solved = false;
  }

  createAllElements() {
    this.component = this.createElement('div', 'task-block');

    this.wrapper = this.createElement('div', 'task-wrapper');
    this.header = this.createElement('h2', 'task-header', 'Реши задачу:');
  }

  createElement(tag, className, text) {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    if (text) {
      elem.innerHTML = text;
    }
    return elem;
  }

  render() {
    this.createAllElements();
  }

  isCorrect() {
    return this.solution === this.correctSolution;
  }

  isSolved() {
    return this.solved;    
  }

  remove() {
    this.wrapper.remove();
  }

  init() {
    this.render();
  }
}