import { getRandomNumber } from '../../../randomize';
import { Task } from '../';
  
export default class RandomExpressionTask extends Task {
  constructor() {
    super();

    this.solved = false;
  }
  
  createAllElements() {
    this.component = this.createElement('div', 'task-block');

    this.wrapper = this.createElement('div', 'task-wrapper');
    this.header = this.createElement('h2', 'task-header', 'Реши задачу:');
    this.text = this.createElement('div', 'task-text', `${this.firstNumber} ${this.operator} ${this.secondNumber} = `);
    
    this.form = this.createElement('form', 'solution');
    this.input = this.createElement('input', 'solution-input');
    
    this.input.classList.add('num-solution-input');
  }

  addHandlers() {
    this.form.addEventListener('submit', this.submitAnswer.bind(this)); 
    this.form.addEventListener('keydown', this.enterSolution.bind(this)); 
  }

  submitAnswer(e) {
    if (this.input.value === '') {
      this.solution = NaN;
    } else {
      this.solution = Number(this.input.value);
    }

    if (this.isCorrect()) {
      this.input.classList.add('correct');
      const div = this.createElement('div', 'solution-correct', 'Правильно!');
      this.component.appendChild(div);
      this.input.setAttribute('disabled', 'disabled');
    } else {
      this.input.classList.add('wrong');
      const div = this.createElement('div', 'solution-wrong', `Неправильно! Правильный ответ: ${this.correctSolution}`);
      this.component.appendChild(div);
      this.input.setAttribute('disabled', 'disabled');
    }
    
    this.solved = true;

    e.preventDefault();
  }

  enterSolution (e) {
    const keyCode = e.keyCode;
    if ( keyCode === 46 || keyCode === 8 || keyCode === 13 || keyCode === 27 || keyCode >= 35 && keyCode <= 39) {
      return;
    } else if ((keyCode < 48 || keyCode > 57) && (keyCode < 96 || keyCode > 105 )) {
      e.preventDefault();
    }
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

  init() {
    const operators = ['+', '-', 'x', '&#247;'];

    this.operator = operators[getRandomNumber(operators.length)];

    if (this.operator === '+') {
      this.firstNumber = getRandomNumber(100);
      this.secondNumber = getRandomNumber(100);
      this.correctSolution = this.firstNumber + this.secondNumber;
    } else if (this.operator === '-') {
      this.firstNumber = getRandomNumber(100);
      this.secondNumber = getRandomNumber(this.firstNumber);
      this.correctSolution = this.firstNumber - this.secondNumber;
    } else if (this.operator === 'x') {
      this.firstNumber = getRandomNumber(10);
      this.secondNumber = getRandomNumber(10);
      this.correctSolution = this.firstNumber * this.secondNumber;
    } else {
      this.secondNumber = getRandomNumber(10, 1);
      this.firstNumber = this.secondNumber * getRandomNumber(20);
      this.correctSolution = this.firstNumber / this.secondNumber;
    }

    this.render();
  }
}
