import Mode from './mode';
import { Navigation } from '../navigation'
import Travel from './travelMode';
import { Task } from '../tasks';
import { getRandomNumber } from '../randomize';

export default class Battle extends Mode {
  constructor(canvas, player, monster) {
    super(canvas, player, monster);

    this.isPlayerTurn = true;
    this.isEnemyTurn = false;
  }

  render() {
    super.render();

    const healthPointsScaleWidth = this.canvas.width / 2 - 100;
    
    this.renderText(this.player.name, 55, 50, healthPointsScaleWidth - 10);     
    this.renderHealthScale(this.player.healthPoints, healthPointsScaleWidth, 50, 70, this.player.maxHealth);
    this.renderText(this.player.healthPoints, 55, 90, healthPointsScaleWidth - 10);  
    
    this.renderText(this.monster.getFullName(), this.canvas.width - 55, 50, healthPointsScaleWidth - 10, '#fff', 'right');
    this.renderHealthScale(this.monster.healthPoints, healthPointsScaleWidth, this.canvas.width - healthPointsScaleWidth - 50, 70, this.monster.maxHealth);
    this.renderText(this.monster.healthPoints, this.canvas.width - 55, 90, healthPointsScaleWidth - 10, '#fff', 'right'); 
    
    if (this.isPlayerTurn) {
      this.player.setState('aim');

      if (!this.spellNav) {
        this.renderSpellNav();
      } else if (this.spellNav.isSelected()) {
        this.renderTaskWindow();
      }

      if (this.task && this.task.isSolved()) {
        this.isPlayerTurn = false;
        setTimeout(this.renderAttack.bind(this), 1000);
      }
    } else if (this.isEnemyTurn){
      this.isEnemyTurn = false;
      setTimeout(this.renderEnemyAttack.bind(this), 1000);
    }
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

  renderSpellNav() {
      const links = ['Удар', 'Лечение'];
      this.spellNav = new Navigation('Выбери заклинание:', links);
      this.spellNav.init();
  }

  renderTaskWindow() {
    if (!this.task) {
      this.task = new Task();
      this.task.init();
    } 
  }

  renderAttack() {
    this.task.remove();

    if (this.task.isCorrect()) {
      this.player.setState('hit');

      const missedHP = getRandomNumber(60, 30);

      if (this.spellNav.targetId === '2') {
        this.player.setHealthPoints(missedHP);
      } else {
        this.monster.setHealthPoints(-missedHP);
      }

    } else {
      this.player.setState('miss');  
    }

    this.task = null;
    this.spellNav = null;

    if (this.monster.healthPoints !== 0) {
      this.isEnemyTurn = true;
    }
  }

  renderEnemyAttack() {
    const missedHP = getRandomNumber(30, 10);
    this.player.setHealthPoints(-missedHP);
    if (this.player.healthPoints !== 0) {
      this.isPlayerTurn = true;
    }
  }

  isFinished() {
    return this.monster.healthPoints === 0 || this.player.healthPoints === 0;
  }

  getNext() {
    console.log('бой окончен');
    //return new Travel(this.canvas);
  }

  init() {
    this.player.imagePosition = [150, (this.canvas.height / 2)];
    this.monster.imagePosition = [(this.canvas.width - 200), (this.canvas.height / 2 + 47)];
  }
}