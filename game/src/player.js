import Character from './character';

export default class Player extends Character {
  constructor(...args) {
    super(...args);
    this.pressedButtons = {'up': false, 'right': false, 'down': false, 'left': false, 'amount': 0};
  }

  move(e) {
    const keyCode = e.keyCode;
    const buttonDirection = this.getButtonDirection(keyCode);
    const imageShiftX = this.getImageShiftX(buttonDirection);
    const imageShiftY = this.getImageShiftY(buttonDirection);

    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
      if (this.state.action !== 'run') {
        this.setState('run');
      }
      this.setSpritePosition();

      this.addPressedButtons(buttonDirection);
      this.setImagePosition(imageShiftX, imageShiftY);
    }

    if (keyCode === 37) {
      this.imageReverse = true;
    } else if (keyCode === 39) {
      this.imageReverse = false;
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
    if (this.pressedButtons.amount < 2) {
      this.pressedButtons[buttonDirection] = true;
      this.pressedButtons.amount += 1;
    }
  }

  getImageShiftX(buttonDirection) {
    let shiftX = this.speed;
    if (buttonDirection === 'left' || this.pressedButtons['left']) {
      shiftX = -shiftX;
    }

    if (buttonDirection !== 'left' && !this.pressedButtons['left'] && buttonDirection !== 'right' && !this.pressedButtons['right']) {
      return 0;
    } else if (this.pressedButtons['up'] || this.pressedButtons['down']) {
      return shiftX / 2;
    } else {
      return shiftX;
    } 
  }

  getImageShiftY(buttonDirection) {
    let shiftY = this.speed;
    if (buttonDirection === 'up' || this.pressedButtons['up']) {
      shiftY = -shiftY;
    }

    if (buttonDirection !== 'up' && !this.pressedButtons['up'] && buttonDirection !== 'down' && !this.pressedButtons['down']) {
      return 0;
    } else if (this.pressedButtons['left'] || this.pressedButtons['right']) {
      return shiftY / 2;
    } else {
      return shiftY;
    } 
  }

  stop(e) {
    const keyCode = e.keyCode;
    const buttonDirection = this.getButtonDirection(keyCode);
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
      this.setState('stay');
      this.setSpritePosition();
      this.removePressedButtons(buttonDirection);
    }
  }

  removePressedButtons(buttonDirection) {
    this.pressedButtons.amount -= 1;
    this.pressedButtons[buttonDirection] = false;
  }
}