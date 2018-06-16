import { Player } from './entities';
import { heroStates } from './constants';
import Stage from './stage';
import Resources from './resources';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    this.level = 1;
  }

  startGame() {
    const playerStartPosition = [100, (this.canvas.height - 160)];
    const currentState = heroStates.get('stay');
    const healthPoints = 100;

    this.player = new Player('Hero', 'Scrooge', healthPoints, this.canvas, 'images/hero-sprite.png', playerStartPosition, currentState, currentState.action, currentState.imageSize[0], currentState.imageSize[1], currentState.animationDelay, currentState.repeat, currentState.spriteSize, currentState.firstSpritePosition, currentState.framesAmount);

    this.render();
  }

  render() {
    if (!this.stage) {
      this.stage = new Stage(this.canvas, this.player);
      this.stage.init();
    }

    if (this.stage.isCompleted()) {
      this.level += 1;
      this.stage = null;
    }

    window.requestAnimationFrame(this.render.bind(this));
  }
  
  init() { 
    this.startGame();
  }
}

const canvas = document.querySelector('#gameCanvas');
const game = new Game(canvas);

const resources = new Resources();

resources.load([
    'images/hero-sprite.png',
    'images/enemy-sprite.png',
    'images/castSpell.png',
    'images/lightning.png',
    'images/bg.jpg',
    'images/breath.png',
    'images/heal.png',
]);

resources.onReady(game.init.bind(game));
