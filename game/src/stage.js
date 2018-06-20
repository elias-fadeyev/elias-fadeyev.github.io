import { getRandomNumber, getRandomData } from './randomize';
import { enemyNames, enemyAppearances, enemyStates } from './constants';
import { Enemy } from './entities';
import { Travel } from './gameModes';

export default class Stage {  
  constructor(canvas, resources, player, level) {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
    this.resources = resources;
    this.player = player;
    this.level = level;
    this.enemies = [];
  }

  render() {
    if (!this.mode) {
      this.finished = true;
    } else {
      this.mode.render();

      this.renderText(`Уровень ${this.level}`, this.canvas.width / 2, 50, this.canvas.width, '#ffd700', 'center', '32px serif');

      if (this.mode.isFinished()) {
        if (this.mode.hasHandlers) {
          this.mode.removeHandlers();
        }
        this.mode = this.mode.getNext(this.enemies);
        if (this.mode) {
          this.mode.init();
        }
      }
    }
  }

  renderText(text, leftPosition, topPosition, maxWidth, color = '#fff', align = 'left', font = '20px serif') {
    this.canvasContext.font = font;
    this.canvasContext.fillStyle = color;
    this.canvasContext.textAlign = align; 
    this.canvasContext.fillText(text, leftPosition, topPosition, maxWidth);
  }

  createMonster(enemyStartPosition, taskTheme) {
    const enemyAppearance = getRandomData(enemyAppearances);
    const enemyHealth = getRandomNumber(150, 100);
    const currentEnemyState = enemyStates.get('stay');
    const enemyPartWidth = currentEnemyState.imageSize[0];
    const enemyPartHeight = currentEnemyState.imageSize[1];

    const monster = new Enemy(taskTheme, getRandomData(enemyNames), enemyAppearance, enemyHealth, this.canvas, this.resources.get('images/enemy-sprite.png'), enemyStartPosition, currentEnemyState, currentEnemyState.action, enemyPartWidth, enemyPartHeight, currentEnemyState.animationDelay,  currentEnemyState.repeat, currentEnemyState.spriteSize);

    this.enemies.push(monster);
  }

  isCompleted() {
    return this.finished;
  }

  init() {
    this.createMonster([(this.canvas.width - getRandomNumber(150, 130)), (this.canvas.height - getRandomNumber(200, 200))], 'math');

    this.createMonster([(this.canvas.width - getRandomNumber(440, 420)), (this.canvas.height - getRandomNumber(235, 225))], 'english');

    this.mode = new Travel(this.canvas, this.resources, this.player, this.enemies);
    this.mode.init();
  }
}
