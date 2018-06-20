import { getRandomNumber } from '../../../randomize';
import { Task } from '../';

export default class TimeTask extends Task {
  constructor() {
    super();

    this.solved = false;

    this.inputs = [];
    this.selectedElementIndex = 0;
  }
  
  addHandlers() {
    document.addEventListener('keydown', this.selectElement);
    this.form.addEventListener('submit', this.submitAnswer); 
    document.addEventListener('click', this.changeFocus);
  }
  
  removeHandlers() {
    document.removeEventListener('keydown', this.selectElement);
    document.removeEventListener('click', this.changeFocus);
  }
  
  bindThis() {
    this.selectElement = this.selectElement.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
  }
  
  selectElement(e) {
    const keyCode = e.keyCode;

    if (keyCode === 37) {
      this.selectedElementIndex -= 1;

      if (this.selectedElementIndex < 0) {
        this.selectedElementIndex = this.inputs.length - 1;
      }
      this.inputs[this.selectedElementIndex].focus();
    } else if (keyCode === 39) {
      this.selectedElementIndex += 1;

      if (this.selectedElementIndex > this.inputs.length - 1) {
        this.selectedElementIndex = 0;
      }
      this.inputs[this.selectedElementIndex].focus();
    }
  }
  
  createAllElements() {
    this.component = this.createElement('div', 'task-block');

    this.wrapper = this.createElement('div', 'task-wrapper');
    this.header = this.createElement('h2', 'task-header', 'Переведи время в правильное количество дней, часов и минут');
    
    this.renderTimeText(this.time);
    this.text = this.createElement('div', 'task-text', `${this.time.hours} ${this.hoursText} ${this.time.minutes} ${this.minutesText}`);
    
    this.form = this.createElement('form', 'solution');
    
    this.inputDays = this.createInputElement();
    this.inputHours = this.createInputElement();
    this.inputMinutes = this.createInputElement();
    
    this.labelDays = this.createElement('label', 'input-label', 'Дни:');
    this.labelHours = this.createElement('label', 'input-label', 'Часы:');
    this.labelMinutes = this.createElement('label', 'input-label', 'Минуты:');
    
    this.inputs.push(this.inputDays, this.inputHours, this.inputMinutes);
    
    this.button = this.createElement('button', 'submit-button', 'Подтвердить');
  }
  
  createInputElement() {
    return this.createElement('input', 'num-solution-input');
  }
  
  submitAnswer(e) {        
    this.solutionDays = +this.inputDays.value;
    this.solutionHours = +this.inputHours.value;
    this.solutionMinutes = +this.inputMinutes.value;

    if (this.isCorrect()) {
      this.inputs.forEach(input => {
        input.classList.add('correct');
        input.setAttribute('disabled', 'disabled');
      })
      const div = this.createElement('div', 'solution-correct', 'Правильно!');
      this.component.appendChild(div);
      
    } else {
      this.inputs.forEach(input => {
        input.classList.add('wrong');
        input.setAttribute('disabled', 'disabled');
      })
      
      this.renderTimeText(this.correctTime);
      
      const div = this.createElement('div', 'solution-wrong', `Неправильно! Правильный ответ: ${this.correctTime.days} ${this.daysText} ${this.correctTime.hours} ${this.hoursText} ${this.correctTime.minutes} ${this.minutesText}`);
      this.component.appendChild(div);
    }

    this.solved = true;

    e.preventDefault();
  }
  
  renderTimeText(timeObject) {
    const days = ['день', 'дня', 'дней'];
    const hours = ['час', 'часа', 'часов'];
    const minutes = ['минута', 'минуты', 'минут'];

    this.daysText = days[this.getTimeTextIndex(timeObject.days)];
    this.hoursText = hours[this.getTimeTextIndex(timeObject.hours)];
    this.minutesText = minutes[this.getTimeTextIndex(timeObject.minutes)];
  }
  
  getTimeTextIndex(unit) {
    if (unit === 1 || (unit > 20 && unit % 10 === 1)) {
      return 0;
    } else if (unit < 5 || (unit > 20 && unit % 10 < 5 && unit % 10 !== 0)) {
      return 1;
    } else {
      return 2;
    }
  }

  changeFocus(e) {
    const target = e.target;
    if (!target.classList.contains('num-solution-input')) {
      return;
    }

    this.selectedElementIndex = this.inputs.indexOf(target);
}

  render() {
    this.createAllElements();

    this.component.appendChild(this.header);  
    this.component.appendChild(this.text);
    
    this.labelDays.appendChild(this.inputDays);
    this.labelHours.appendChild(this.inputHours);
    this.labelMinutes.appendChild(this.inputMinutes);
    
    this.form.appendChild(this.labelDays);
    this.form.appendChild(this.labelHours);
    this.form.appendChild(this.labelMinutes);
    
    this.form.appendChild(this.button);
    this.component.appendChild(this.form);
    this.wrapper.appendChild(this.component);
    document.body.appendChild(this.wrapper);

    this.inputs[this.selectedElementIndex].focus();
    this.addHandlers();
  }

  isCorrect() {
    return this.solutionDays === this.correctTime.days && this.solutionHours === this.correctTime.hours && this.solutionMinutes === this.correctTime.minutes;
  }
  
  init() {
    this.time = {};
    this.time.hours = getRandomNumber(60, 25);
    this.time.minutes = getRandomNumber(400, 61);
    
    this.correctTime = {};

    this.correctTime.minutes = this.time.minutes % 60;
    
    const hours = (this.time.minutes - this.correctTime.minutes) / 60;
    this.correctTime.hours = (this.time.hours + hours) % 24;
    
    const days = (this.time.hours + hours - this.correctTime.hours) / 24;
    this.correctTime.days = days;

    this.bindThis(); 

    this.render();
  }
}