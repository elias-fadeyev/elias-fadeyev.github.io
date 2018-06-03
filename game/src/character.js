import { heroStates } from './data';

export default class Character {
  constructor (name, appearance, url, imagePosition, state, imageWidth, imageHeight, spritePosition) {
    this.name = name;
    this.appearance = appearance;
    this.url = url;
    this.imagePosition = imagePosition;
    this.state = state;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.spritePosition = spritePosition;
    this.imageLastPosition = [];
    this.speed = 10;
    this.imageReverse = false;
  }
  
  renderImage(ctx) {
    const img = new Image();
    img.src = this.url;
    this.setSpritePosition();
    ctx.save();
    if (this.imageReverse) {
      ctx.scale(-1, 1);
    }
    ctx.drawImage(img, 
      this.spritePosition[0], this.spritePosition[1], 
      this.state.spriteSize[0], this.state.spriteSize[1], 
      this.getImageXPosition(), this.imagePosition[1], 
      this.state.imageSize[0], this.state.imageSize[1]
    );
    ctx.restore();
  }

  getImageXPosition() {
    if (this.imageReverse) {
      return (-this.imagePosition[0] - this.state.imageSize[0]);
    }
    return this.imagePosition[0];
  }

  setImagePosition(dx, dy) {
    this.imagePosition[0] += dx;
    this.imagePosition[1] += dy;
  }

  setSpritePosition() {
    this.spritePosition[0] += this.state.spriteSize[0];
    if (this.spritePosition[0] >= (this.state.spriteSize[0] * this.state.imageAmount)) {
      this.spritePosition[0] = 0;
    }
  }

  setState(state) {
    this.state = heroStates.get(state);
    this.spritePosition = this.state.firstSpritePosition.slice();
    this.spritePosition[0] -= this.state.spriteSize[0];
  }
}
