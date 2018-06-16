import { getRandomNumber, getRandomData } from './randomize';
import { enemyNames, enemyAppearances, enemyStates } from './constants';
import { Enemy } from './entities';
import { Travel } from './gameModes';

export default class Stage {  
  constructor(canvas, player) {
    this.canvas = canvas;
    this.player = player;
    this.enemies = [];
  }

  render() {
    this.mode.render();

    if (this.mode.isFinished()) {
      if (this.mode.hasHandlers) {
        this.mode.removeHandlers();
      }
      this.mode = this.mode.getNext(this.enemies);
      this.mode.init();
    }

    window.requestAnimationFrame(this.render.bind(this));
  }

  createMonster(enemyStartPosition) {
    const enemyAppearance = getRandomData(enemyAppearances);
    const enemyHealth = getRandomNumber(150, 100);
    const currentEnemyState = enemyStates.get('stay');
    const enemyPartWidth = currentEnemyState.imageSize[0];
    const enemyPartHeight = currentEnemyState.imageSize[1];

    const monster = new Enemy(getRandomData(enemyNames), enemyAppearance, enemyHealth, this.canvas, 'images/enemy-sprite.png', enemyStartPosition, currentEnemyState, currentEnemyState.action, enemyPartWidth, enemyPartHeight, currentEnemyState.animationDelay,  currentEnemyState.repeat, currentEnemyState.spriteSize);

    this.enemies.push(monster);
  }

  isCompleted() {
    return false;
  }

  init() {
    this.createMonster([(this.canvas.width - getRandomNumber(150, 130)), (this.canvas.height - getRandomNumber(200, 200))]);

    this.createMonster([(this.canvas.width - getRandomNumber(440, 420)), (this.canvas.height - getRandomNumber(235, 225))]);

    this.mode = new Travel(this.canvas, this.player, this.enemies);
    this.mode.init();

    this.render();
  }
}
