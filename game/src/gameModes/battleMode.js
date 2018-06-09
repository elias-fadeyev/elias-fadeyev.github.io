import Mode from './mode';
import { Navigation } from '../navigation'
import { toASCII } from 'punycode';
import { Travel } from '.';

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
      if (!this.spellNav) {
        const links = ['Удар', 'Лечение'];
        this.spellNav = new Navigation('Выбери заклинание:', links);
        this.spellNav.init();
      }

      if (this.spellNav.isSelected) {
        this.getNext();
      }
    }
    
    this.player.renderImage(); 
    this.monster.renderImage(); 

    
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

  isFinished() {
    if (this.monster.healthPoints === 0 || this.player.healthPoints === 0) {
      return true;
    }
    return false;
  }

  getNext() {
    if (!this.isFinished) {
      return new Task();
    }

    return new Travel();
  }

  init() {
    this.player.imagePosition = [150, (this.canvas.height / 2)];
    this.monster.imagePosition = [(this.canvas.width - 200), (this.canvas.height / 2 + 47)];
  }
}