import { getRandomNumber, getRandomData } from './randomize';
import { enemyNames, enemyAppearances, heroStates, enemyStates } from './constants';
import { Player, Enemy } from './entities';
import { Registration, Battle, Travel } from './gameModes';

export default class Stage {  
  constructor(canvas, player) {
    this.canvas = canvas;
    this.player = player;
  }

  render() {
    this.mode.render();

    if (this.mode.isFinished()) {
      this.player.clearCache();
      this.mode.removeHandlers();
      this.mode = this.mode.getNext();
      this.mode.init();
    }

    window.requestAnimationFrame(this.render.bind(this));
  }

  init() {
    const enemyStartPosition = [(this.canvas.width - getRandomNumber(300, 200)), (this.canvas.height - getRandomNumber(200, 150))];
    const enemyAppearance = getRandomData(enemyAppearances);
    const currentEnemyState = enemyStates.get('stay');
    const enemyPartWidth = currentEnemyState.imageSize[0];
    const enemyPartHeight = currentEnemyState.imageSize[1];

    this.monster = new Enemy(getRandomData(enemyNames), enemyAppearance, this.canvas, 'images/enemy-sprite.png', enemyStartPosition, currentEnemyState, currentEnemyState.action, enemyPartWidth, enemyPartHeight, currentEnemyState.animationDelay);

    this.mode = new Travel(this.canvas, this.player, this.monster);
    this.mode.init();

    this.render();
  }
}
