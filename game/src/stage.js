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
      this.mode = this.mode.getNext();
    }

    window.requestAnimationFrame(this.render.bind(this));
  }

  init() {
    const enemyStartPosition = [(this.canvas.width - 200), (this.canvas.height / 2 + 40)];
    const enemyAppearance = getRandomData(enemyAppearances);
    const currentEnemyState = enemyStates.get('stay');
    const enemyPartWidth = currentEnemyState.imageSize[0];
    const enemyPartHeight = currentEnemyState.imageSize[1];

    this.monster = new Enemy(getRandomData(enemyNames), enemyAppearance, 'images/enemy-sprite.png', enemyStartPosition, currentEnemyState, currentEnemyState.action, enemyPartWidth, enemyPartHeight, currentEnemyState.animationDelay);

    this.mode = new Travel(this.canvas, this.player, this.monster);
    this.mode.init();

    this.render();
  }
}
