import Character from './characterClass';
import { heroStates } from './../constants';

export default class Player extends Character {
  constructor(...args) {
    super(...args);
    this.speed = 6;
    this.pressedButtons = {'up': false, 'right': false, 'down': false, 'left': false, 'amount': 0};
    this.maxHealth = 100;

    this.time = Date.now();
  }
  
  renderImage() {
    if (this.pressedButtons.amount > 0) {      
      const imageShiftX = this.getImageShiftX();
      const imageShiftY = this.getImageShiftY();
      
      this.imageReverse = this.isImageReverse(imageShiftX);
      
      if (this.stateAction !== 'run') {
        this.setState('run');
      }

      if (Date.now() - this.time > 550) {
        const audio = new Audio('audio/step.wav');
        audio.volume = 0.4;
        audio.play();

        this.time = Date.now();
      }
      
      const maxWidth = this.canvas.width;
      const maxHeight = this.canvas.height;
      const minWidth = 0;
      const minHeight = 220;
      
      this.setImagePosition(imageShiftX, imageShiftY, maxWidth, maxHeight, minWidth, minHeight);
    }
  
    super.renderImage();
  }

  handleInput(e) {
    const keyCode = e.keyCode;
    const buttonDirection = this.getButtonDirection(keyCode);

    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
      this.addPressedButtons(buttonDirection);
    }
  }

  getButtonDirection(keyCode) {
    if (keyCode === 37) {
      return 'left';
    } else if (keyCode === 38) {
      return 'up';
    } else if (keyCode === 39) {
      return 'right';
    } else if (keyCode === 40) {
      return 'down';
    }
  }

  addPressedButtons(buttonDirection) {
    if (!this.pressedButtons[buttonDirection]) {
      this.pressedButtons[buttonDirection] = true;
      this.pressedButtons.amount += 1;
    }
  }

  getImageShiftX() {
    let shiftX = this.speed;

    if (this.pressedButtons['left']) {
      shiftX = -shiftX;
    }

    if (!this.pressedButtons['left'] && !this.pressedButtons['right']) {
      return 0;
    } else if (this.pressedButtons['up'] || this.pressedButtons['down']) {
      return shiftX / Math.sqrt(2);
    } else {
      return shiftX;
    } 
  }

  getImageShiftY() {
    let shiftY = this.speed;
    if (this.pressedButtons['up']) {
      shiftY = -shiftY;
    }

    if (!this.pressedButtons['up'] && !this.pressedButtons['down']) {
      return 0;
    } else if (this.pressedButtons['left'] || this.pressedButtons['right']) {
      return shiftY / Math.sqrt(2);
    } else {
      return shiftY;
    } 
  }

  stopHandleInput(e) {
    const keyCode = e.keyCode;
    const buttonDirection = this.getButtonDirection(keyCode);
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
      this.setState('stay');
      this.removePressedButtons(buttonDirection);
    }
  }

  removePressedButtons(buttonDirection) {
    this.pressedButtons.amount -= 1;
    this.pressedButtons[buttonDirection] = false;
  }

  clearCache() {
    this.pressedButtons['up'] = false;
    this.pressedButtons['right'] = false;
    this.pressedButtons['down'] = false;
    this.pressedButtons['left'] = false;
    this.pressedButtons.amount = 0;
  }
  
  setState(state) {
    this.state = heroStates.get(state);
    
    super.setState(this.state);
  }
}