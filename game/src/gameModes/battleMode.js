import Mode from './mode';

export default class Battle extends Mode {
  render() {
    this.canvasContext.fillStyle = '#aaa';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);   

    const healthPointsScaleWidth = this.canvas.width / 2 - 100;
    
    this.renderText(this.player.name, 55, 50, healthPointsScaleWidth - 10);     
    this.renderHealthScale(this.player.healthPoints, healthPointsScaleWidth, 50, 70);
    this.renderText(this.player.healthPoints, 55, 90, healthPointsScaleWidth - 10);  
    
    this.renderText(this.monster.getFullName(), this.canvas.width - 55, 50, healthPointsScaleWidth - 10, '#fff', 'right');
    this.renderHealthScale(this.monster.healthPoints, healthPointsScaleWidth, this.canvas.width - healthPointsScaleWidth - 50, 70);
    this.renderText(this.monster.healthPoints, this.canvas.width - 55, 90, healthPointsScaleWidth - 10, '#fff', 'right'); 
    
    if (this.isPlayerTurn()) {
      this.player.setState('aim');
    }
    
    this.player.renderImage(this.canvas, this.canvasContext); 
    this.monster.renderImage(this.canvas, this.canvasContext); 

    
    window.requestAnimationFrame(this.render.bind(this));  
  }

  renderText(text, leftPosition, topPosition, maxWidth, color = '#fff', align = 'left', font = '20px serif') {
    this.canvasContext.font = font;
    this.canvasContext.fillStyle = color;
    this.canvasContext.textAlign = align; 
    this.canvasContext.fillText(text, leftPosition, topPosition, maxWidth);
  }
  
  renderHealthScale(currentHealthPoints, healthPointsScaleWidth, leftPosition, topPosition) {
    this.canvasContext.fillStyle = 'red';
    this.canvasContext.fillRect(leftPosition, topPosition, healthPointsScaleWidth, 30);
    
    this.canvasContext.fillStyle = 'green';
    this.canvasContext.fillRect(leftPosition, topPosition, healthPointsScaleWidth * currentHealthPoints / 100, 30);
  }
  
  isPlayerTurn() {
    return true;
  }
}