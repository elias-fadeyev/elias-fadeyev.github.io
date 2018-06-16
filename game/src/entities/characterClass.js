import Entity from './entityClass';

export default class Character extends Entity {
  constructor (name, appearance, healthPoints, canvas, url, imagePosition, state, stateAction, imageWidth, imageHeight, animationDelay, spriteRepeat, spriteSize, spritePosition, framesAmount) {
    super(canvas, url, imageWidth, imageHeight, imagePosition, spriteSize, spritePosition, animationDelay, framesAmount, spriteRepeat);
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
    this.imageWidth = state.imageSize[0];
    this.imageHeight = state.imageSize[1];
    this.spritePosition = state.firstSpritePosition.slice();
    this.spriteSize = state.spriteSize.slice();
    this.framesAmount = state.framesAmount;
    this.animationDelay = state.animationDelay;
    this.spriteRepeat = state.repeat;
    if (this.spriteRepeat) {
      this.framesPerSecond = 15;
    } else {
      this.framesPerSecond = 8;
    }
  }

  // changeSpritePosition() {
  //   super.changeSpritePosition();

  //   if (this.isFramesCycleEnded() && !this.spriteRepeat) {
  //     this.spritePosition[0] = this.spriteSize[0] * (this.framesAmount - 1);
  //     //this.setState('stay');
  //   }
  // }

  setHealthPoints(hp) {
    if (hp === 0) return;
    this.healthPoints += hp / Math.abs(hp);

    setTimeout(() => {
      this.setHealthPoints(hp - hp / Math.abs(hp));

      if (this.healthPoints < 0) {
        this.healthPoints = 0;
      } else if (this.healthPoints > this.maxHealth) {
        this.healthPoints = this.maxHealth;
      }
    }, 10)
  }
}