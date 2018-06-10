export default class Mode {
  constructor(canvas, player, monster) {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
    this.player = player;
    this.monster = monster;
    this.hasHandlers = false;
  }

  render() {
    this.canvasContext.fillStyle = '#aaa';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
    if ((this.player.imagePosition[1] + this.player.imageHeight) < (this.monster.imagePosition[1] + 50)) {
      this.player.renderImage(this.canvas, this.canvasContext); 
      this.monster.renderImage(this.canvas, this.canvasContext); 
    } else {
      this.monster.renderImage(this.canvas, this.canvasContext); 
      this.player.renderImage(this.canvas, this.canvasContext); 
    }
  }
}
