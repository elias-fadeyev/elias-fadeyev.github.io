import { getRandomNumber, shuffle } from '../../../randomize';
import { Task } from '../';

export default class DevisorTask extends Task {
  constructor() {
    super();
    this.numbersAmount = 3;
    
    this.solved = false;
    
    this.values = [];    
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
    this.header = this.createElement('h2', 'task-header', `Выбери число, делящееся без остатка на ${this.devisor}:`);
    
    this.form = this.createElement('form', 'solution');
    
    this.values.forEach(value => {
      const valueButton = this.createElement('button', 'number');
      valueButton.innerHTML = value;
      
      this.buttons.push(valueButton);
      
      this.form.appendChild(valueButton);
    })
  }
  
  submitAnswer(e) {
    const focusTarget = document.activeElement;
    
    if (!focusTarget.classList.contains('number') || this.isSolved()) {
      e.preventDefault();
      return;
    }
    
    this.solution = +focusTarget.innerHTML;

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

  addNumbers(amount) {
    while (this.values.length < amount) {
      let number = getRandomNumber(199, 10);
      
      if (number % this.devisor === 0) {
        number += 1;
      }
      
      if (this.values.indexOf(number) !== -1) {
        continue;
      }
      
      this.values.push(number);
    }
  }
  
  init() {
    this.devisor = getRandomNumber(10, 2);
    
    const number = getRandomNumber(20, 10);
    
    this.correctSolution = this.devisor * number;
    this.values.push(this.correctSolution);
    
    this.addNumbers(this.numbersAmount);
    
    shuffle(this.values);

    this.bindThis(); 

    this.render();
  }
}
