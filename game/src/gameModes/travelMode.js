import Mode from './mode';
import { Battle } from '.';

export default class Travel extends Mode {      
  addHandlers() {
		document.addEventListener('keydown', this.player.handleInput);
    document.addEventListener('keyup', this.player.stopHandleInput);

    this.hasHandlers = true;
	}

  bindThis() {
    this.player.handleInput = this.player.handleInput.bind(this.player);
    this.player.stopHandleInput = this.player.stopHandleInput.bind(this.player);
  }

  removeHandlers() {
    document.removeEventListener('keydown', this.player.handleInput);
    document.removeEventListener('keyup', this.player.stopHandleInput);

    this.hasHandlers = false;

    this.player.clearCache();
  }

  isFinished() {
    const playerLeft = this.player.imagePosition[0];
    const playerRight = this.player.imagePosition[0] + this.player.imageWidth;
    const playerTop = this.player.imagePosition[1];
    const playerBottom = this.player.imagePosition[1] + this.player.imageHeight;

    this.enemies.forEach(monster => {
      const monsterLeft = monster.imagePosition[0];
      const monsterRight = monster.imagePosition[0] + monster.imageWidth;
      const monsterTop = monster.imagePosition[1];
      const monsterBottom = monster.imagePosition[1] + monster.imageHeight;

      if (!(playerRight < monsterLeft || playerLeft > monsterRight) && !(playerTop > (monsterBottom - 100) || playerBottom < (monsterTop + 30))) {
        this.attackedMonster = monster;
      }
    })

    return (this.attackedMonster);
  }

  getNext() {
    const attackedMonster = this.attackedMonster;
    this.attackedMonster = null;
    return new Battle(this.canvas, this.player, attackedMonster);
  }

  init() {
    this.bindThis();
    this.addHandlers();
  }
}