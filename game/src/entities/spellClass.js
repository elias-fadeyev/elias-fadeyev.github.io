import Entity from './entityClass';

export default class Spell extends Entity {
  constructor(heal, speed,  ...rest) {
    super(...rest);

    this.heal = heal;
    this.speed = speed;
    this.framesPerSecond = 10;
    this.active = false;
  }

  setState(state) {
    this.currentState = state;
    this.spritePosition = state.firstSpritePosition.slice();
    this.spriteSize = state.spriteSize.slice();
    this.framesAmount = state.framesAmount;
    this.imageWidth = state.imageSize[0];
    this.imageHeight = state.imageSize[1];
    this.animationDelay = state.animationDelay;
    this.spriteRepeat = state.repeat;
  }
}