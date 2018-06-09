import Entity from './entityClass';

export default class Character extends Entity {
  constructor (name, appearance, canvas, url, imagePosition, state, stateAction, imageWidth, imageHeight, animationDelay, spritePosition, framesAmount) {
    super(canvas, url, imageWidth, imageHeight, imagePosition, spritePosition, animationDelay, framesAmount);
    this.name = name;
    this.appearance = appearance;
    this.state = state;
    this.stateAction = stateAction;
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
  }
}