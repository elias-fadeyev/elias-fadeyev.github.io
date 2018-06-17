import { getRandomNumber } from '../../randomize';
import { Task } from '.';
import { dictionary } from '.';
  
export default class TranslateTask extends Task {
  constructor() {
    super();

    this.solved = false;
  }
  
  createAllElements() {
    this.component = this.createElement('div', 'task-block');

    this.wrapper = this.createElement('div', 'task-wrapper');
    this.header = this.createElement('h2', 'task-header', 'Введи перевод:');
    this.text = this.createElement('div', 'task-text', `${this.word.original}`);
    
    this.form = this.createElement('form', 'solution');
    this.input = this.createElement('input', 'solution-input');
    
    this.input.classList.add('text-solution-input');
  }

  addHandlers() {
    this.form.addEventListener('submit', this.submitAnswer.bind(this)); 
  }

  submitAnswer(e) {
    this.solution = this.input.value.trim().toLowerCase();

    if (this.isCorrect()) {
      this.input.classList.add('correct');
      const div = this.createElement('div', 'solution-correct', 'Правильно!');
      this.component.appendChild(div);
      this.input.setAttribute('disabled', 'disabled');
    } else {
      this.input.classList.add('wrong');
      const div = this.createElement('div', 'solution-wrong', `Неправильно! Правильный ответ: ${this.correctSolution[0]}`);
      this.component.appendChild(div);
      this.input.setAttribute('disabled', 'disabled');
    }
    
    this.solved = true;

    e.preventDefault();
  }

  render() {
    this.createAllElements();

    this.form.appendChild(this.input);
    this.text.appendChild(this.form);
    this.component.appendChild(this.header);
    this.component.appendChild(this.text);
    this.wrapper.appendChild(this.component);
    document.body.appendChild(this.wrapper);

    this.input.focus();
    this.addHandlers();
  }

  isCorrect() {
    return this.correctSolution.some(translates => translates === this.solution);
  }

  init() {
    this.word = dictionary[getRandomNumber(dictionary.length)];
    
    this.correctSolution = this.word.translation.split(',').map(translation => translation.trim());
    
    this.render();
  }
}
