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

    const rendQuery = this.enemies.concat(this.player).sort((a, b) => ((a.imagePosition[1] + a.imageHeight) - (b.imagePosition[1] + b.imageHeight + 35)));

    rendQuery.forEach(charachter => {
      charachter.renderImage(); 
    })
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

  playAudio(url, volume = 1) {
    const audio = new Audio(url);
    audio.volume = +volume;
    audio.play();
  }
}
