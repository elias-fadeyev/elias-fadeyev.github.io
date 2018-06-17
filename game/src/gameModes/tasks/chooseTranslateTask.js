import { getRandomNumber, shuffle } from '../../randomize';
import { Task } from '.';
import { dictionary } from '.';

export default class ChooseTranslateTask extends Task{
  constructor() {
    super();
    
    this.choicesAmount = 3;
    this.solved = false;
    
    this.choices = [];
    this.buttons = [];
    this.selectedElementIndex = 0;
  }
  
  addHandlers() {
    document.addEventListener('keydown', this.selectElement);
    this.form.addEventListener('submit', this.submitAnswer.bind(this)); 
  }
  
  removeHandlers() {
    document.removeEventListener('keydown', this.selectElement);
  }
  
  bindThis() {
    this.selectElement = this.selectElement.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  
  createAllElements() {
    this.component = this.createElement('div', 'task-block');

    this.wrapper = this.createElement('div', 'task-wrapper');
    this.header = this.createElement('h2', 'task-header', 'Выбери правильный перевод:');
    this.text = this.createElement('div', 'task-word', `${this.word.original}`);

    this.form = this.createElement('form', 'solution');
    
    this.choices.forEach(choice => {
      const choiceButton = this.createElement('button', 'choice-button');
      choiceButton.innerHTML = choice;    
      
      this.buttons.push(choiceButton);
      
      this.form.appendChild(choiceButton);
    })
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

  submitAnswer(e) {
    const focusTarget = document.activeElement;
    
    if (!focusTarget.classList.contains('choice-button') || this.isSolved()) {
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

    this.text.appendChild(this.form);
    this.component.appendChild(this.header);
    this.component.appendChild(this.text);
    this.wrapper.appendChild(this.component);
    document.body.appendChild(this.wrapper);

    this.buttons[this.selectedElementIndex].focus();
    this.addHandlers();
  }
  
  addChoices(number) {
    while (this.choices.length < number) {
      const word = dictionary[getRandomNumber(dictionary.length)];
      const wordTranslate = word.translation.split(',')[0];
      
      if (wordTranslate === this.correctSolution || this.choices.indexOf(wordTranslate) !== -1) {
        continue;
      }
      
      this.choices.push(wordTranslate);
    }
  }

  init() {
    this.word = dictionary[getRandomNumber(dictionary.length)];
    this.correctSolution = this.word.translation.split(',')[0];
    
    this.addChoices(this.choicesAmount);
    this.choices.push(this.correctSolution);
    shuffle(this.choices);
    
    this.bindThis();
    
    this.render();
  }
}
