export default class Entity {
  constructor(url, imageWidth, imageHeight, imagePosition, spritePosition, animationDelay = 0, framesAmount = 1) {
    this.url = url;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.imagePosition = imagePosition;
    this.spritePosition = spritePosition;
    this.imageReverse = false;
    this.framesPerSecond = 15;
    this.startWaitingTime = Date.now();
    this.delayInterval = 0;
    this.animationDelay = animationDelay;
    this.animationTime = 0;
    this.lastRenderingTime = Date.now();
    this.framesAmount = framesAmount;
    this.spriteDirectionReverse = false;
    this.spriteDirectionChangeable = false;
  }
  
  renderImage(canvas, ctx) {
    const img = new Image();
    img.src = this.url;
    
    this.delayInterval = this.getTimeInterval(this.startWaitingTime, Date.now());
      
    if (this.isAnimationStarted() && this.isFramesCycling()) {
        this.animationTime = this.getTimeInterval(this.lastRenderingTime + this.animationDelay, Date.now());
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
    return this.delayInterval > this.animationDelay;
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
      this.spritePosition[0] = this.state.spriteSize[0] * Math.floor(this.framesPerSecond * this.animationTime / 1000);    
    } else {
      this.spritePosition[0] = this.state.spriteSize[0] * (this.framesAmount - Math.ceil(this.framesPerSecond * this.animationTime / 1000));      
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
      this.lastRenderingTime = Date.now();
    }
  }

  isFramesCycling() {
    return this.framesAmount > 1;
  }

  isFramesCycleEnded() {
    return this.spritePosition[0] >= (this.state.spriteSize[0] * this.framesAmount) || this.spritePosition[0] < 0;
  }

  getTimeInterval(startTime, endTime) {
    return endTime - startTime;
  }
  
  changeSpriteDirection() {
    this.spriteDirectionReverse = !this.spriteDirectionReverse;
  }
}