import Player from './player';
import Enemy from './enemy';
import { enemyNamesData, enemyAppearancesData, heroStates, enemyStates } from './data';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    this.gameMode = 'battle';
  }
  
  addHandlers() {
		document.removeEventListener('keydown', this.player.handleInput);
    document.removeEventListener('keyup', this.player.stopHadnleInput);
	}

  bindThis() {
    this.player.handleInput = this.player.handleInput.bind(this);
    this.player.stopHadnleInput = this.player.stopHadnleInput.bind(this);
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
    this.canvasContext.fillStyle = '#aaa';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.gameMode === 'travel') {
      this.player.renderImage(this.canvas, this.canvasContext); 
      this.monster.renderImage(this.canvas, this.canvasContext); 
    }      
    
    if (this.gameMode === 'battle') {
      document.removeEventListener('keydown', this.player.handleInput.bind(this.player));
      document.removeEventListener('keyup', this.player.stopHadnleInput.bind(this.player));
      
      const healthPointsScaleWidth = this.canvas.width / 2 - 100;
      
      this.renderText(this.player.name, 55, 50, healthPointsScaleWidth - 10);     
      this.renderHealthScale(this.player.healthPoints, healthPointsScaleWidth, 50, 70);
      this.renderText(this.player.healthPoints, 55, 100, healthPointsScaleWidth - 10);  
      
      this.renderText(this.monster.getFullName(), this.canvas.width - 55, 50, healthPointsScaleWidth - 10, '#fff', 'right');
      this.renderHealthScale(this.monster.healthPoints, healthPointsScaleWidth, this.canvas.width - healthPointsScaleWidth - 50, 70);
      this.renderText(this.monster.healthPoints, this.canvas.width - 55, 100, healthPointsScaleWidth - 10, '#fff', 'right'); 
      
      if (this.isPlayerTurn()) {
        this.renderText('Выбери заклинание', this.canvas.width / 2 - 50, this.canvas.height / 2, this.canvas.width, '#fff', 'left', '32px serif');
        this.player.setState('aim');
      }
      
      this.player.renderImage(this.canvas, this.canvasContext); 
      this.monster.renderImage(this.canvas, this.canvasContext); 
    }
    
    window.requestAnimationFrame(this.render.bind(this));  
  }
  
  ///////////////////////////////////////////
  
  
  renderText(text, leftPosition, topPosition, maxWidth, color = '#fff', align = 'left', font = '20px serif') {
    this.canvasContext.font = font;
    this.canvasContext.fillStyle = color;
    this.canvasContext.textAlign = align; 
    this.canvasContext.fillText(text, leftPosition, topPosition, maxWidth);
  }
  
  renderHealthScale(currentHealthPoints, healthPointsScaleWidth, leftPosition, topPosition) {
    this.canvasContext.fillStyle = 'red';
    this.canvasContext.fillRect(leftPosition, topPosition, healthPointsScaleWidth, 50);
    
    this.canvasContext.fillStyle = 'green';
    this.canvasContext.fillRect(leftPosition, topPosition, healthPointsScaleWidth * currentHealthPoints / 100, 50);
  }
  
  isPlayerTurn() {
    return true;
  }
  
  
  
  
  
  
  /////////////////////////////////////////
  
  init() { 
    const playerStartPosition = [100, (this.canvas.height / 2)];
    const currentState = heroStates.get('stay');
    const framesAmount = currentState.framesAmount;

    this.player = new Player('Hero', 'Scrooge', 'images/sprite.png', playerStartPosition, currentState, currentState.action, currentState.imageSize[0], currentState.imageSize[1], currentState.firstSpritePosition, framesAmount);
    
    this.addHandlers();
    this.bindThis();

    const enemyStartPosition = [(this.canvas.width - 200), (this.canvas.height / 2 + 40)];
    const enemyAppearance = this.getRandomData(enemyAppearancesData);
    const currentEnemyState = enemyStates.get('stay');

    this.monster = new Enemy(this.getRandomData(enemyNamesData), enemyAppearance, 'images/enemy-sprite.png', enemyStartPosition, currentEnemyState, currentEnemyState.action, currentEnemyState.imageSize[0], currentEnemyState.imageSize[1]);

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
