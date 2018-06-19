import { Player } from './entities';
import { heroStates } from './constants';
import Stage from './stage';
import Resources from './resources';
import { Result, Register } from './gameModes';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    this.level = 1;
  }

  showRegister() {
    const img = new Image();
    img.src = 'images/start-bg.jpg';
    this.canvasContext.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

    if (!this.registerWindow) {
      this.registerWindow = new Register();
      this.registerWindow.init();

      this.music = new Audio('audio/main-theme.mp3');
      this.music.volume = 0.5;
      this.music.play();
    } else if (this.registerWindow.getName()) {
      this.name = this.registerWindow.getName();

      this.registerWindow.remove();
      this.registerWindow = null;

      this.music.pause();

      const playerStartPosition = [100, (this.canvas.height - 160)];
      const currentState = heroStates.get('stay');
      const healthPoints = 100;

      this.player = new Player(this.name, 'Scrooge', healthPoints, this.canvas, 'images/hero-sprite.png', playerStartPosition, currentState, currentState.action, currentState.imageSize[0], currentState.imageSize[1], currentState.animationDelay, currentState.repeat, currentState.spriteSize, currentState.firstSpritePosition, currentState.framesAmount);

      window.cancelAnimationFrame(this.loop);
      
      this.startGame();
      return;
    }

    this.loop = window.requestAnimationFrame(this.showRegister.bind(this));
  }

  startGame() {
    this.render();

    this.loop = window.requestAnimationFrame(this.startGame.bind(this));

    if (this.isGameOver()) {
      window.cancelAnimationFrame(this.loop);
    }
  }

  clearInfo() {
    this.stage = null;
    this.level = 1;
  }

  restartGame() {
    this.resultWindow.remove();
    this.resultWindow = null;

    this.clearInfo();
    this.showRegister();

    document.removeEventListener('keydown', this.restartGame);
  }

  render() {
    if (!this.stage) {
      this.stage = new Stage(this.canvas, this.player, this.level);
      this.stage.init();
      const audio = new Audio('audio/start-stage.mp3');
      audio.volume = 0.3;
      audio.play();
    } else if (this.stage.isCompleted()) {
      this.level += 1;
      this.stage = null;
    } else if (this.isGameOver() && !this.resultWindow) {
      const img = new Image();
      img.src = 'images/record-bg.jpg';
      const audio = new Audio('audio/death.mp3');
      audio.volume = 0.3;
      audio.play();

      this.canvasContext.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

      this.resultWindow = new Result(this.player.name, this.level);
      this.resultWindow.init();

      this.restartGame = this.restartGame.bind(this);

      document.addEventListener('keydown', this.restartGame);
    } else {
      this.stage.render();
    }
  }

  isGameOver() {
    return this.player.healthPoints === 0;
  }
  
  init() {
    this.showRegister();
  }
}

const loader = document.querySelector('#loader');
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
    'images/start-bg.jpg',
    'images/record-bg.jpg',
]);

resources.onReady(game.init.bind(game));
resources.onReady(() => {loader.style.display='none'});
