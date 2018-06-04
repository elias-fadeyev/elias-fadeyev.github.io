import Character from './character';
import Player from './player';
import Enemy from './enemy';
import { enemyNamesData, enemyAppearancesData, heroStates } from './data';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');;
  }

  getRandomNumber(amount) {
    return Math.floor(Math.random() * amount);
  }
  
  getRandomData(dataObject) {
    const randomElementsObject = new Map();
    dataObject.forEach((dataValues, dataKey) => {
      randomElementsObject.set(dataKey, dataValues[this.getRandomNumber(dataValues.length)]);
    })
    return randomElementsObject;
  }
  
  render() {
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.renderImage(this.canvas, this.canvasContext);   
    window.requestAnimationFrame(this.render.bind(this));  
  }
  
  init() { 
    const playerStartPosition = [100, (this.canvas.height / 2 - 50)];
    const currentState = heroStates.get('stay');

    this.player = new Player('Hero', 'Scrooge', 'images/sprite.png', playerStartPosition, currentState, currentState.action, currentState.imageSize[0], currentState.imageSize[1], currentState.firstSpritePosition);
    document.addEventListener('keydown', this.player.move.bind(this.player));
    document.addEventListener('keyup', this.player.stop.bind(this.player));

    this.monster1 = new Enemy(this.getRandomData(enemyNamesData), this.getRandomData(enemyAppearancesData));
    this.monster2 = new Enemy(this.getRandomData(enemyNamesData), this.getRandomData(enemyAppearancesData));
    this.render();
  }
}

const img = new Image();
img.addEventListener('load', () => {
  const canvas = document.querySelector('#gameCanvas');
  const game = new Game(canvas);
  game.init();
})
img.src = 'images/sprite.png';
