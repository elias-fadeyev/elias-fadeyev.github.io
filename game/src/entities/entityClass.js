export default class Entity {
  constructor(canvas, urlRes, imageWidth, imageHeight, imagePosition, spriteSize, spritePosition, animationDelay = 0, framesAmount = 1, spriteRepeat = true) {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
    this.urlRes = urlRes;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.imagePosition = imagePosition;
    this.spritePosition = spritePosition;
    this.spriteSize = spriteSize;
    this.imageReverse = false;
    this.framesPerSecond = 15;
    this.speed = 15;
    this.startWaitingTime = Date.now();
    this.animationDelay = animationDelay;
    this.animationTime = 0;
    this.lastRenderingTime = Date.now();
    this.framesAmount = framesAmount;
    this.spriteDirectionReverse = false;
    this.spriteDirectionChangeable = false;
    this.spriteRepeat = spriteRepeat;
    this.isMoving = false
  }
  
  renderImage() {
    this.delayInterval = this.getTimeInterval(this.startWaitingTime, Date.now());

    if (this.isMoving) {      
      this.moveToPosition();
    }

    const currentImageWidth = this.imageWidth * (1 - (this.canvas.height - this.imagePosition[1]) / 2500);
    const currentImageHeight = this.imageHeight * (1 - (this.canvas.height - this.imagePosition[1]) / 2500);
      
    if (this.isAnimationStarted() && this.isFramesCycling()) {
        this.animationTime = this.getTimeInterval(this.lastRenderingTime + this.animationDelay, Date.now());
        this.changeSpritePosition();
    }
    this.canvasContext.save();
    if (this.imageReverse) {
      this.canvasContext.scale(-1, 1);
    }

    this.canvasContext.drawImage(this.urlRes, 
      this.spritePosition[0], this.spritePosition[1], 
      this.spriteSize[0], this.spriteSize[1], 
      this.getImageXPosition(), this.imagePosition[1], 
      currentImageWidth, currentImageHeight
    );
    this.canvasContext.restore();
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
      return (-this.imagePosition[0] - this.imageWidth);
    }
    return this.imagePosition[0];
  }
  
  setImagePosition(dx, dy, maxWidth, maxHeight, minWidth, minHeight) {
    this.imagePosition[0] += dx;
    this.imagePosition[1] += dy;
    
    if (!maxWidth) return;

    if (this.imagePosition[1] < minHeight + 49) {
      maxWidth = 420;
    }
    
    if (this.imagePosition[0] < minWidth) {
      this.imagePosition[0] = minWidth;
    } else if ((this.imagePosition[0] + this.imageWidth) > maxWidth) {
      this.imagePosition[0] = maxWidth - this.imageWidth;
    } 

    if (this.imagePosition[0] > (420 - this.imageWidth)) {
      minHeight = minHeight + 65;
    }
    
    if (this.imagePosition[1] < minHeight) {
      this.imagePosition[1] = minHeight;
    } else if ((this.imagePosition[1] + this.imageHeight) > maxHeight) {
      this.imagePosition[1] = maxHeight - this.imageHeight;
    }
  }
  
  changeSpritePosition() {
    if (!this.spriteDirectionReverse) {
      this.spritePosition[0] = this.spriteSize[0] * Math.floor(this.framesPerSecond * this.animationTime / 1000);
    } else {
      this.spritePosition[0] = this.spriteSize[0] * (this.framesAmount - Math.ceil(this.framesPerSecond * this.animationTime / 1000));      
    }
    
    if (this.isFramesCycleEnded() && this.spriteRepeat) {
      if (!this.spriteDirectionReverse && this.spriteDirectionChangeable || this.spriteDirectionReverse && !this.spriteDirectionChangeable) {
        this.spritePosition[0] = this.spriteSize[0] * (this.framesAmount - 1);
      } else {
        this.spritePosition[0] = 0;
      }
      
      if (this.spriteDirectionChangeable) {
        this.changeSpriteDirection();
      }
      
      this.startWaitingTime = Date.now();
      this.lastRenderingTime = Date.now();
    } else if (this.isFramesCycleEnded() && !this.spriteRepeat) {
      this.spritePosition[0] = this.spriteSize[0] * (this.framesAmount - 1);
    }
  }

  isFramesCycling() {
    return this.framesAmount > 1;
  }

  isFramesCycleEnded() {
    return this.spritePosition[0] >= (this.spriteSize[0] * this.framesAmount) || this.spritePosition[0] < 0;
  }

  getTimeInterval(startTime, endTime) {
    return endTime - startTime;
  }
  
  changeSpriteDirection() {
    this.spriteDirectionReverse = !this.spriteDirectionReverse;
  }

  moveToPosition() {
    const dx = this.finalPosition[0] - this.imagePosition[0];
    const dy = this.finalPosition[1] - this.imagePosition[1];

    const dl = Math.sqrt(Math.pow(dx, 2), Math.pow(dy, 2));

    const stepX = dx / (dl / this.speed);
    const stepY = dy / (dl / this.speed);

    if (Math.floor(dl) > this.speed) {
      this.setImagePosition(stepX, stepY);
    } else {
      this.isMoving = false;
    }
  }

  move(finalPosition) {
    this.finalPosition = finalPosition;
    this.isMoving = true;
  }
}