import { Player, Enemy } from './entities';
import { enemyNames, enemyAppearances, heroStates, enemyStates } from './constants';
import Stage from './stage';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
  }

  startGame() {
    const playerStartPosition = [100, (this.canvas.height / 2)];
    const currentState = heroStates.get('stay');

    this.player = new Player('Hero', 'Scrooge', this.canvas, 'images/sprite.png', playerStartPosition, currentState, currentState.action, currentState.imageSize[0], currentState.imageSize[1], currentState.animationDelay, currentState.firstSpritePosition, currentState.framesAmount, currentState.animationDelay);

    this.stage = new Stage(this.canvas, this.player);
    this.stage.init();
  }
  
  init() { 
    this.startGame();
  }
}

const img = new Image();
img.addEventListener('load', () => {
  const canvas = document.querySelector('#gameCanvas');
  const game = new Game(canvas);
  game.init();
})
img.src = 'images/sprite.png';
