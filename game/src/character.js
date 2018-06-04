import { heroStates } from './data';

export default class Character {
  constructor (name, appearance, url, imagePosition, state, stateAction, imageWidth, imageHeight, spritePosition) {
    this.name = name;
    this.appearance = appearance;
    this.url = url;
    this.imagePosition = imagePosition;
    this.state = state;
    this.stateAction = stateAction;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.spritePosition = spritePosition;
    this.imageLastPosition = [];
    this.speed = 5;
    this.imageReverse = false;
    this.startRenderindtime = Date.now();
    this.timeInterval = 0;
    this.firstAnimationDelay = 1000;
    //this.renderingDelay = 100;
  }
  
  renderImage(canvas, ctx) {
    const img = new Image();
    img.src = this.url;

    this.timeInterval = this.getTimeInterval();
      
    if (this.isAnimationStarted()) {
      this.setSpritePosition();
    }
    
    ctx.save();
    if (this.imageReverse) {
      ctx.scale(-1, 1);
    }
    ctx.drawImage(img, 
      this.spritePosition[0], this.spritePosition[1], 
      this.state.spriteSize[0], this.state.spriteSize[1], 
      this.getImageXPosition(), this.imagePosition[1], 
      this.imageWidth, this.imageHeight
    );
    ctx.restore();
  }
  
  isAnimationStarted() {
    if (this.stateAction === 'stay') {
      return this.timeInterval >= this.firstAnimationDelay;
    }
    return this.timeInterval > 0;
  }

  getImageXPosition() {
    if (this.imageReverse) {
      return (-this.imagePosition[0] - this.state.imageSize[0]);
    }
    return this.imagePosition[0];
  }

  setImagePosition(dx, dy, maxWidth, maxHeight) {
    this.imagePosition[0] += dx;
    this.imagePosition[1] += dy;
    
    if (this.imagePosition[0] < 0) {
      this.imagePosition[0] = 0;
    } else if ((this.imagePosition[0] + this.imageWidth) > maxWidth) {
      this.imagePosition[0] = maxWidth - this.imageWidth;
    }
    
    if (this.imagePosition[1] < 0) {
      this.imagePosition[1] = 0;
    } else if ((this.imagePosition[1] + this.imageHeight) > maxHeight) {
      this.imagePosition[1] = maxHeight - this.imageHeight;
    }
  }

  setSpritePosition() {
    this.spritePosition[0] += this.state.spriteSize[0];
    if (this.spritePosition[0] >= (this.state.spriteSize[0] * this.state.imageAmount)) {
      this.spritePosition[0] = 0;
      this.startRenderingTime = Date.now();
    }
  }

  setState(state) {
    this.state = heroStates.get(state);
    if (this.stateAction === this.state.action) {
      return;
    }
    this.stateAction = this.state.action;
    this.spritePosition = this.state.firstSpritePosition.slice();
  }
  
  isImageReverse(dx) {
    if (dx === 0) {
      return this.imageReverse;
    }
    return dx < 0;
  }
  
  getTimeInterval() {
    return Date.now() - this.startRenderingTime;
  }
}