import Sprite from './sprite';

export default class Character extends Sprite {
  constructor (name, appearance, url, imagePosition, state, stateAction, imageWidth, imageHeight, spritePosition) {
    super(url, imageWidth, imageHeight, imagePosition, spritePosition);
    this.name = name;
    this.appearance = appearance;
    this.state = state;
    this.stateAction = stateAction;
  }
  
  setState(state) {
    if (this.stateAction === this.state.action) {
      return;
    }
    this.stateAction = this.state.action;
    this.spritePosition = this.state.firstSpritePosition.slice();
    this.framesAmount = this.state.framesAmount;
  }
}