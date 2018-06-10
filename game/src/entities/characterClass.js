import Entity from './entityClass';

export default class Character extends Entity {
  constructor (name, appearance, healthPoints, canvas, url, imagePosition, state, stateAction, imageWidth, imageHeight, animationDelay, spritePosition, framesAmount, spriteRepeat) {
    super(canvas, url, imageWidth, imageHeight, imagePosition, spritePosition, animationDelay, framesAmount, spriteRepeat);
    this.name = name;
    this.appearance = appearance;
    this.state = state;
    this.stateAction = stateAction;
    this.healthPoints = healthPoints;
  }
  
  setState(state) {
    if (this.stateAction === state.action) {
      return;
    }
    this.stateAction = state.action;
    this.spritePosition = state.firstSpritePosition.slice();
    this.framesAmount = state.framesAmount;
    this.imageWidth = state.imageSize[0];
    this.imageHeight = state.imageSize[1];
    this.animationDelay = state.animationDelay;
    this.spriteRepeat = state.repeat;
    if (this.spriteRepeat) {
      this.framesPerSecond = 15;
    } else {
      this.framesPerSecond = 8;
    }
  }

  setSpritePosition() {
    super.setSpritePosition();

    if (this.isFramesCycleEnded() && !this.spriteRepeat) {
      this.setState('stay');
    }
  }

  setHealthPoints(hp) {
    // this.healthPoints -= 1;
    // if (this.healthPoints > 0 && hp > 0) {
    //   this.setHealthPoints(hp - 11);
    // }
    this.healthPoints += hp;
    if (this.healthPoints < 0) {
      this.healthPoints = 0;
    } else if (this.healthPoints > this.maxHealth) {
      this.healthPoints = this.maxHealth;
    }
  }
}