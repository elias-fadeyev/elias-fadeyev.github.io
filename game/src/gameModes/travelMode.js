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
    
    const monsterLeft = this.monster.imagePosition[0];
    const monsterRight = this.monster.imagePosition[0] + this.monster.imageWidth;
    const monsterTop = this.monster.imagePosition[1];
    const monsterBottom = this.monster.imagePosition[1] + this.monster.imageHeight;

    return (!(playerRight < monsterLeft || playerLeft > monsterRight) && !(playerTop > (monsterBottom - 100) || playerBottom < (monsterTop + 30)));
  }

  getNext() {
    return new Battle(this.canvas, this.player, this.monster);
  }

  init() {
    this.bindThis();
    this.addHandlers();
  }
}