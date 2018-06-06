export default class Sprite {
  constructor(url, imageWidth, imageHeight, imagePosition, spritePosition, framesAmount) {
    this.url = url;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.imagePosition = imagePosition;
    this.spritePosition = spritePosition;
    this.imageReverse = false;
    this.startWaitingTime = Date.now();
    this.delayInterval = 0;
    this.animationDelay = 1000;
    this.renderingInterval = 0;
    this.lastRenderingTime = Date.now();
    this.framesAmount = framesAmount;
    this.spriteDirectionReverse = false;
    this.spriteDirectionChangeable = false;
  }
  
  renderImage(canvas, ctx) {
    const img = new Image();
    img.src = this.url;
    
    this.delayInterval = this.getTimeInterval(this.startWaitingTime, Date.now());
    this.renderingInterval = this.getTimeInterval(this.lastRenderingTime, Date.now());
      
    if (this.isAnimationStarted() && this.isFramesCycling()) {
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
    this.lastRenderingTime = Date.now();
  }
  
  isAnimationStarted() {
    if (this.stateAction === 'stay') {
      return this.delayInterval >= this.animationDelay;
    }
    return this.delayInterval > 0;
  }
  
  isImageReverse(dx) {
    if (dx === 0) {
      return this.imageReverse;
    }
    return dx < 0;
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
    
    if (!maxWidth) return;
    
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
    if (!this.spriteDirectionReverse) {
      this.spritePosition[0] += this.state.spriteSize[0];
    } else {
      this.spritePosition[0] -= this.state.spriteSize[0];
    }
    
    if (this.isFramesCycleEnded()) {
      if (!this.spriteDirectionReverse && this.spriteDirectionChangeable || this.spriteDirectionReverse && !this.spriteDirectionChangeable) {
        this.spritePosition[0] = this.state.spriteSize[0] * (this.framesAmount - 1);
      } else {
        this.spritePosition[0] = 0;
      }
      
      if (this.spriteDirectionChangeable) {
        this.changeSpriteDirection();
      }
      
      this.startWaitingTime = Date.now();
    }
  }

  isFramesCycling() {
    return this.framesAmount > 1;
  }

  isFramesCycleEnded() {
    return this.spritePosition[0] >= (this.state.spriteSize[0] * this.framesAmount) || this.spritePosition[0] <= 0;
  }

  getTimeInterval(startTime, endTime) {
    return endTime - startTime;
  }
  
  changeSpriteDirection() {
    this.spriteDirectionReverse = !this.spriteDirectionReverse;
  }
}