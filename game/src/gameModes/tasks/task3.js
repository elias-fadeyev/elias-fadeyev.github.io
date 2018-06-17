import { getRandomNumber, shuffle } from '../../randomize';
import { Task } from '.';
import { dictionary } from '.';

export default class Task3 extends Task {
  constructor() {
    super();

    this.buttons = [];
    this.buttonWidth = 50;
    this.currentZIndex = 1;
    this.solved = false;
  }
  
  createAllElements() {
    this.component = this.createElement('div', 'task-block');

    this.wrapper = this.createElement('div', 'task-wrapper');
    this.header = this.createElement('h2', 'task-header', 'Собери слово внутри рамки:');
    
    this.wordField = this.createElement('div', 'word-field');
    this.cancelButton = this.createElement('button', 'cancel-button', 'Я не знаю ответ');

    this.text = this.createElement('div', 'task-text', 'Используй мышь');
    
    let currentLeft = 5;
    
    this.letters.forEach(letter => {
      const span = document.createElement('span');
      span.innerHTML = letter;
      span.classList.add('letter');
      span.draggable = true;
      span.style.left = currentLeft + 'px';
      span.style.top = 5 + 'px';
      span.style.width = this.buttonWidth + 'px';
      span.style.height = this.buttonWidth + 'px';
      
      let currentGreen = getRandomNumber(210, 150);
      span.style.backgroundColor = `rgb(240, ${currentGreen}, 0)`;
      
      this.buttons.push(span);
      
      this.wordField.style.width = this.buttonWidth * this.buttons.length + 20 +'px';
      this.wordField.style.height = this.buttonWidth + 20 + 'px';
      this.wordField.appendChild(span);
      
      currentLeft += this.buttonWidth;
    })
  }
  
  addHandlers() {
    document.addEventListener('mousedown', this.takeLetter);
    document.addEventListener('mouseup', this.dropLetter);
    document.addEventListener('dragstart', (e) => {e.preventDefault();});
    this.cancelButton.addEventListener('click', this.cancel);
  }
  
  removeHandlers() {
    document.removeEventListener('mousedown', this.takeLetter);
    document.removeEventListener('mouseup', this.dropLetter);
    this.cancelButton.removeEventListener('click', this.cancel);
  }
  
  bindThis() {
    this.takeLetter = this.takeLetter.bind(this);
    this.dropLetter = this.dropLetter.bind(this);
    this.moveLetter = this.moveLetter.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  
  takeLetter(e) {
    this.target = e.target;
    
    this.target.style.zIndex = this.currentZIndex;
    
    if (!this.target.classList.contains('letter')) {
      return;
    }
    
    document.addEventListener('mousemove', this.moveLetter);
  }
  
  moveLetter(e) {
    const wordFieldCoord = this.wordField.getBoundingClientRect();
    
    this.target.style.left = e.clientX - wordFieldCoord.left - this.target.offsetWidth / 2 + 'px';
    this.target.style.top = e.clientY - wordFieldCoord.top - this.target.offsetHeight / 2 + 'px';
  }
  
  dropLetter(e) {
    document.removeEventListener('mousemove', this.moveLetter);
    
    this.currentZIndex += 1;
    
    if (!this.isInsideField()) return;

    this.buttons.sort((a, b) => parseInt(a.style.left) - parseInt(b.style.left));
    
    this.solution = '';
    
    this.buttons.forEach(elem => {
      this.solution += elem.innerHTML;
    })
    
    if (this.isCorrect()) {
      this.removeHandlers();
      this.wordField.classList.add('correct');
      
      let currentLeft = 5;
      
      this.buttons.forEach((letter, i) => {
        letter.style.left = currentLeft + 'px';
        letter.style.top = 5 + 'px';
        letter.style.backgroundColor = '#080';
        
        letter.innerHTML = this.correctSolution[i];
        
        currentLeft += this.buttonWidth;
      })
      
      this.solved = true;
    }
  }  
  
  isInsideField() {
    return this.buttons.every(elem => {
      return parseInt(elem.style.left) >= 0 && parseInt(elem.style.left) <= parseInt(this.wordField.style.width) - this.buttonWidth && parseInt(elem.style.top) >= 0 && parseInt(elem.style.top) <= parseInt(this.wordField.style.height) - this.buttonWidth;
    });
  }
  
  cancel() {
    this.wordField.classList.add('wrong');
    let currentLeft = 5;
    
    this.buttons.forEach((letter, i) => {
      letter.style.left = currentLeft + 'px';
      letter.style.top = 5 + 'px';
      letter.style.backgroundColor = '#d00';
      
      letter.innerHTML = this.correctSolution[i];
      
      currentLeft += this.buttonWidth;
    })
    
    this.removeHandlers();
    
    this.solved = true;
  }
  
  render() {    
    this.component.appendChild(this.header);
    this.component.appendChild(this.text);
    this.component.appendChild(this.wordField);
    this.component.appendChild(this.cancelButton);
    this.wrapper.appendChild(this.component);
    document.body.appendChild(this.wrapper);    
  }
  
  init() {
    const word = dictionary[getRandomNumber(dictionary.length)];

    this.correctSolution = word.original;
    
    this.letters = this.correctSolution.split('');
    
    while (this.correctSolution === this.letters.join('')) {
      shuffle(this.letters);
    }
    
    this.createAllElements();
    this.bindThis();        
    this.addHandlers();
    
    this.render();
  }
}
