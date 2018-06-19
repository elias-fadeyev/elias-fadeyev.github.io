import { getRandomNumber } from '../../../randomize';
import { Task } from '../';
import { dictionary } from '.';
  
export default class AuditionTask extends Task {
  constructor() {
    super();

    this.synth = window.speechSynthesis;
    this.solved = false;
  }
  
  createAllElements() {
    this.component = this.createElement('div', 'task-block');

    this.wrapper = this.createElement('div', 'task-wrapper');
    this.header = this.createElement('h2', 'task-header', 'Введи произнесенное слово:');
    
    this.form = this.createElement('form', 'solution');
    this.input = this.createElement('input', 'solution-input');

    this.repeatButton = this.createElement('button', 'repeat-button', 'Произнести еще раз');
    
    this.input.classList.add('text-solution-input');
  }

  addHandlers() {
    document.addEventListener('keydown', this.selectElement)
    this.form.addEventListener('submit', this.submitAnswer); 
    this.repeatButton.addEventListener('click', this.repeat);
  }

  bindThis() {
    this.selectElement = this.selectElement.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.repeat = this.repeat.bind(this);
  }

  selectElement(e) {
    const keyCode = e.keyCode;

    if (keyCode === 38) {
      this.input.focus();
    } else if (keyCode === 40) {
      this.repeatButton.focus();
    }
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
      const div = this.createElement('div', 'solution-wrong', `Неправильно! Правильный ответ: ${this.correctSolution}`);
      this.component.appendChild(div);
      this.input.setAttribute('disabled', 'disabled');
    }
    
    this.solved = true;

    e.preventDefault();
  }

  render() {
    this.createAllElements();

    this.form.appendChild(this.input);
    this.component.appendChild(this.header);
    this.component.appendChild(this.form);
    this.component.appendChild(this.repeatButton);
    this.wrapper.appendChild(this.component);
    document.body.appendChild(this.wrapper);

    this.getVoice();

    this.input.focus();
    this.addHandlers();
  }

  repeat() {
    this.synth.cancel();
    this.getVoice();
  }

  getVoice() {
    const voices = window.speechSynthesis.getVoices();

    this.utterThis = new SpeechSynthesisUtterance(this.correctSolution);
    this.utterThis.lang = 'en-US';
    this.utterThis.voice = voices[1];

    this.synth.speak(this.utterThis);
  }

  init() {
    const word = dictionary[getRandomNumber(dictionary.length)];
    
    this.correctSolution = word.original;

    this.bindThis();    
    this.render();
  }
}
