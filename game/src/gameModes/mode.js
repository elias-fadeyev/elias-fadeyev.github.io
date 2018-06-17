export default class Mode {
  constructor(canvas, player, enemies = []) {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
    this.player = player;
    this.enemies = enemies;
    this.hasHandlers = false;
  }

  render() {
    this.renderBackground();
    this.renderCharInfo();

    const rendQuery = this.enemies.concat(this.player).sort((a, b) => ((a.imagePosition[1] + a.imageHeight) - (b.imagePosition[1] + b.imageHeight + 35)));

    rendQuery.forEach(charachter => {
      charachter.renderImage(); 
    })
  }

  renderCharInfo() {
    const healthPointsScaleWidth = this.canvas.width / 2 - 100;
    
    this.renderText(this.player.name, 55, 50, healthPointsScaleWidth - 10);     
    this.renderHealthScale(this.player.healthPoints, healthPointsScaleWidth, 50, 70, this.player.maxHealth);
    this.renderText(this.player.healthPoints, 55, 90, healthPointsScaleWidth - 10);  
  }

  renderBackground() {
    const img = new Image();
    img.src = 'images/bg.jpg';
    this.canvasContext.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }

  renderText(text, leftPosition, topPosition, maxWidth, color = '#fff', align = 'left', font = '20px serif') {
    this.canvasContext.font = font;
    this.canvasContext.fillStyle = color;
    this.canvasContext.textAlign = align; 
    this.canvasContext.fillText(text, leftPosition, topPosition, maxWidth);
  }

  renderHealthScale(currentHealthPoints, healthPointsScaleWidth, leftPosition, topPosition, maxHealth) {
    this.canvasContext.fillStyle = '#f00';
    this.canvasContext.fillRect(leftPosition, topPosition, healthPointsScaleWidth, 30);
    
    this.canvasContext.fillStyle = '#080';
    this.canvasContext.fillRect(leftPosition, topPosition, healthPointsScaleWidth * currentHealthPoints / maxHealth, 30);
  }

  playAudio(url, volume = 1) {
    const audio = new Audio(url);
    audio.volume = +volume;
    audio.play();
  }
}
