import { getRandomNumber } from '../../../randomize';
import { Task } from '../';

export default class ChooseMaxTask extends Task{
  constructor() {
    super();
    
    this.decimalsAmount = 2;
    
    this.solved = false;
    
    this.decimals = {};

    this.buttons = [];
    this.selectedElementIndex = 0;
  }
  
  addHandlers() {
    document.addEventListener('keydown', this.selectElement);
    this.form.addEventListener('submit', this.submitAnswer); 
  }
  
  removeHandlers() {
    document.removeEventListener('keydown', this.selectElement);
  }
  
  bindThis() {
    this.selectElement = this.selectElement.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }
  
  selectElement(e) {
    const keyCode = e.keyCode;

    if (keyCode === 37) {
      this.selectedElementIndex -= 1;

      if (this.selectedElementIndex < 0) {
        this.selectedElementIndex = this.buttons.length - 1;
      }
      this.buttons[this.selectedElementIndex].focus();
    } else if (keyCode === 39) {
      this.selectedElementIndex += 1;

      if (this.selectedElementIndex > this.buttons.length - 1) {
        this.selectedElementIndex = 0;
      }
      this.buttons[this.selectedElementIndex].focus();
    }
  }
  
  createAllElements() {
    this.component = this.createElement('div', 'task-block');

    this.wrapper = this.createElement('div', 'task-wrapper');
    this.header = this.createElement('h2', 'task-header', 'Выбери большее число:');
    
    this.form = this.createElement('form', 'solution');
    
    this.values.forEach(value => {
      const decimalButton = this.createElement('button', 'decimal');
      decimalButton.innerHTML = `${this.decimals[value][0]} / ${this.decimals[value][1]}`;
      
      this.buttons.push(decimalButton);
      
      this.form.appendChild(decimalButton);
    })
  }

  submitAnswer(e) {
    const focusTarget = document.activeElement;
    
    if (!focusTarget.classList.contains('decimal') || this.isSolved()) {
      e.preventDefault();
      return;
    }
    
    this.solution = focusTarget.innerHTML;

    if (this.isCorrect()) {
      focusTarget.classList.add('correct');
      const div = this.createElement('div', 'solution-correct', 'Правильно!');
      this.component.appendChild(div);
    } else {
      focusTarget.classList.add('wrong');
      const div = this.createElement('div', 'solution-wrong', `Неправильно! Правильный ответ: ${this.correctSolution}`);
      this.component.appendChild(div);
    }
    
    this.removeHandlers();
    this.solved = true;

    e.preventDefault();
  }

  render() {
    this.createAllElements();

    this.component.appendChild(this.header);
    this.component.appendChild(this.form);
    this.wrapper.appendChild(this.component);
    document.body.appendChild(this.wrapper);

    this.buttons[this.selectedElementIndex].focus();
    this.addHandlers();
  }
  
  addDecimals(amount) {
    let currentAmount = 0;
    
    while (currentAmount < amount) {
      const decimal = [getRandomNumber(10, 1), getRandomNumber(30, 10)];
      
      if (this.decimals[decimal[0] / decimal[1]]) {
        continue;
      }
      
      this.decimals[decimal[0] / decimal[1]] = decimal;
      currentAmount++;
    }
  }

  init() {
    this.addDecimals(this.decimalsAmount);
    
    this.values = Object.keys(this.decimals);
    const max = Math.max.apply(null, this.values);
    this.correctSolution = `${this.decimals[max][0]} / ${this.decimals[max][1]}`;
    
    this.bindThis(); 

    this.render();
  }
}