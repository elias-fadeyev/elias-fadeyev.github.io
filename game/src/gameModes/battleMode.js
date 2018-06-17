import { Navigation } from '../navigation'
import { Mode, Travel } from './';
import { tasks } from './tasks';
import { getRandomNumber } from '../randomize';
import { spells, castSpell } from '../constants';
import { Spell } from '../entities';

export default class Battle extends Mode {
  constructor(canvas, player, monster) {
    super(canvas, player, [monster]);
    
    this.time = Date.now();

    this.monster = monster;

    this.spells = Array.from(spells.keys());

    this._enemyStartPosition = [(this.canvas.width - 200), (this.canvas.height / 2 + 100)];

    this.states = {
      'playerTurn': true,
      'playerCast': false,
      'playerSpell': false,
      'enemyTurn': false,
      'enemyCast': false,
      'enemySpell': false,
      'finished': false,
      'fatality': false,
      'win': false,
      'lose': false
    }
  }
  
  render() {
    super.render();

    if (this.spell)  {
      this.spell.renderImage();
    }

    if (this.cast && this.cast.active)  {
      this.cast.renderImage();
    }
    
    this.renderCharInfo();

    if (this.states['playerTurn'] && (Date.now() - this.time > 1000)) {
      this.renderPlayerTurn();
    } else if (this.states['playerCast'] && (Date.now() - this.time > 500)) {
      this.renderSpellCast();
    } else if (this.states['playerSpell'] && (Date.now() - this.time > 800)) {
      this.renderSpell();
    } else if (this.states['enemyTurn'] && (Date.now() - this.time > 500)) {
      if (this.player.state.action === 'miss' && this.cast.currentState !== castSpell.get('hit')) {
        this.cast.setState(castSpell.get('hit'));
        this.playAudio('audio/explode.ogg', '0.5');
        this.cast.imagePosition[0] = this.player.imagePosition[0] - this.player.imageWidth / 2;
        this.cast.imagePosition[1] = this.player.imagePosition[1] - this.player.imageHeight / 2;
      } 
    
      if (Date.now() - this.time > 1000) {
        this.cast.active = false;

        this.renderEnemyTurn();
      }

      this.spellNav = null;

    } else if (this.states['enemyCast'] && (Date.now() - this.time > 1000)) {
      this.renderEnemyCast();
    } else if (this.states['enemySpell'] && (Date.now() - this.time > 500)) {
      this.renderEnemySpell();
    } else if (this.states['fatality'] && (Date.now() - this.time > 1000)) {
      //this.player.setState('boom');

      this.spell = null;
      this.cast.active = false;
      this.time = Date.now();

      this.states['fatality'] = false;
      this.states['finished'] = true;
    }  else if (this.states['finished'] && (Date.now() - this.time > 1000)) {
      this.player.setState('stay');

      if (this.monster.healthPoints === 0) {
        this.renderText('Победа!', this.canvas.width / 2, this.canvas.height / 2, this.canvas.width, '#ffd700', 'center', '32px "SF Fedora"');
        if (Date.now() - this.time > 2000) {
          this.states['win'] = true;
        } 
      } else if (this.player.healthPoints === 0) {
        this.renderText('Игра окончена!', this.canvas.width / 2, this.canvas.height / 2, this.canvas.width, '#ffd700', 'center', '32px "SF Fedora"');
        if (Date.now() - this.time > 2000) {
          this.states['lose'] = true;
        } 
      }
    }
  }

  renderCharInfo() {
    const healthPointsScaleWidth = this.canvas.width / 2 - 100;
    
    super.renderCharInfo(); 
    
    this.renderText(this.monster.getFullName(), this.canvas.width - 55, 50, healthPointsScaleWidth - 10, '#fff', 'right');
    this.renderHealthScale(this.monster.healthPoints, healthPointsScaleWidth, this.canvas.width - healthPointsScaleWidth - 50, 70, this.monster.maxHealth);
    this.renderText(this.monster.healthPoints, this.canvas.width - 55, 90, healthPointsScaleWidth - 10, '#fff', 'right'); 
  }

  renderSpellNav() {
    this.spellNav = new Navigation('Выбери заклинание:', this.spells);
    this.spellNav.init();
  }

  renderTaskWindow() {
    const CurrentTask = tasks[getRandomNumber(tasks.length)];

    this.task = new CurrentTask();
    this.task.init();
  }

  renderPlayerTurn() {
    this.player.setState('aim');
    this.cast.active = true;
    this.spell = null;
      
    this.cast.setState(castSpell.get('aim'));
    this.cast.imagePosition[0] = this.player.imagePosition[0] + this.player.imageWidth - this.cast.imageWidth / 2;
    this.cast.imagePosition[1] = this.player.imagePosition[1] + this.player.imageHeight - this.cast.imageHeight / 2;
    
    if (!this.spellNav && (Date.now() - this.time > 500)) {
      this.renderSpellNav();
    } else if (this.spellNav && this.spellNav.isSelected() && !this.task) {
      this.renderTaskWindow();
    }
    
    if (this.task && this.task.isSolved()) { 
      if (this.task.isCorrect()) {
        this.playAudio('audio/correct.ogg', '0.1');
      } else {
        this.playAudio('audio/wrong.ogg', '0.2');
      }

      this.states['playerTurn'] = false;
      this.states['playerCast'] = true;        
      this.time = Date.now(); 
    }
  }

  renderSpellCast() {
    if (this.task.isCorrect()) {
      this.player.setState('hit');
      this.cast.setState(castSpell.get('success'));

      if (this.spellNav.targetId === '0') {
        this.cast.move([this.monster.imagePosition[0], this.monster.imagePosition[1] - 30]);
      } else if (this.spellNav.targetId === '1') {
        this.cast.move([this.monster.imagePosition[0] + this.monster.imageWidth / 2 - this.cast.imageWidth - 2 + 30, 180]);
      } else if (this.spellNav.targetId === '2') {
        this.cast.move([this.canvas.width / 2, -100]);
      } 

      this.playAudio('audio/kick.ogg', '0.3');
      this.playAudio('audio/cast.ogg', '0.3');

      this.states['playerSpell'] = true;      
    } else {
      this.player.setState('miss');
      this.cast.setState(castSpell.get('failure'));
      this.playAudio('audio/kick.ogg', '0.3');

      this.states['enemyTurn'] = true;
    }
    
    this.task.remove();
    this.task = null;
    this.time = Date.now(); 
    this.states['playerCast'] = false;
  }
  
  renderSpell() {
    this.player.setState('stay');

    this.cast.active = false;
    
    this.playAudio('audio/explode.ogg', '0.5');

    const spellId = this.spellNav.targetId;
    const spell = spells.get(this.spells[spellId]);
    const imagePosition = [];

    if (spellId === '0') {
      imagePosition[0] = this.monster.imagePosition[0] + this.monster.imageWidth / 2 - spell.imageSize[0] / 2;
      imagePosition[1] = this.monster.imagePosition[1] - this.monster.imageHeight / 2 - spell.imageSize[1] / 4;
    } else if (spellId === '1') {
      imagePosition[0] = this.monster.imagePosition[0] + this.monster.imageWidth / 2 - spell.imageSize[0] / 2;
      imagePosition[1] = 180;

      this.cast.active = true;
      this.cast.setState(castSpell.get('hit'));
      this.cast.imagePosition[0] = this.monster.imagePosition[0] + this.monster.imageWidth / 2 - this.cast.imageWidth / 2 + 20;
      this.cast.imagePosition[1] = this.cast.imagePosition[1] - this.cast.imageHeight / 2;
    } else if (spellId === '2') {
      imagePosition[0] = this.player.imagePosition[0];
      imagePosition[1] = this.player.imagePosition[1];
    }


    this.playAudio(spell.audio, '0.5');
    
    this.spell = new Spell(spell.heal, spell.speed, this.canvas, spell.url, spell.imageSize[0], spell.imageSize[1], imagePosition, spell.spriteSize, spell.firstSpritePosition, spell.animationDelay, spell.framesAmount, spell.repeat);

    let enemyHP = this.monster.healthPoints;
    
    if (this.spell.heal === true) {
      const healedHP = getRandomNumber(30, 20);
      this.player.setHealthPoints(healedHP);
    } else {
      const missedHP = getRandomNumber(60, 30);
      enemyHP -= missedHP; 
      this.monster.setHealthPoints(-missedHP);
    }
    
    this.states['playerSpell'] = false;
    this.time = Date.now();

    if (enemyHP <= 0) {
      this.states['fatality'] = true;
    } else {
      this.states['enemyTurn'] = true;
    }
  }

  renderEnemyTurn() {
    if (this.player.stateAction !== 'stay') {
      this.player.setState('stay');
    }
    this.states['enemyTurn'] = false;
    this.states['enemyCast'] = true;
  }
  
  renderEnemyCast() {
    const spell = spells.get(this.spells[0]);

    this.spell = new Spell(spell.heal, spell.speed, this.canvas, spell.url, spell.imageSize[0], spell.imageSize[1], [this.monster.imagePosition[0] + this.monster.imageWidth - spell.imageSize[0] / 2, this.monster.imagePosition[1] - this.monster.imageHeight / 2], spell.spriteSize, [0, 0], spell.animationDelay, spell.framesAmount, spell.repeat);

    this.spell.move([this.player.imagePosition[0] + this.player.imageWidth / 2 - this.spell.imageWidth / 2, this.player.imagePosition[1]]);

    this.time = Date.now();
    
    this.states['enemyCast'] = false;
    this.states['enemySpell'] = true;
  }

  renderEnemySpell() {
    this.spell.spritePosition = [0, 115];
    this.playAudio('audio/explosion.ogg', '0.5');

    const missedHP = getRandomNumber(30, 10);
    this.player.setHealthPoints(-missedHP);

    this.time = Date.now();
    this.states['enemySpell'] = false;

    if (this.player.healthPoints - missedHP <= 0) {
      this.states['finished'] = true;
    } else {
      this.states['playerTurn'] = true;
    }
  }

  isFinished() {
    return this.states['win'];
  }

  isGameOver() {
    return this.states['lose'];
  }

  getNext(enemies) {
    //const index = enemies.indexOf(this.monster);
    //enemies.splice(index);
    //return new Travel(this.canvas, this.player, enemies);
    return null;
  }
  
  init() {
    this.player.setState('aim');

    this.player.imageReverse = false;
    this.player.imagePosition = [150, (this.canvas.height / 2 + 80)];
    this.monster.imagePosition = this._enemyStartPosition.slice();

    const currentCast = castSpell.get('aim');
    const castImagePosition = []
    castImagePosition[0] = this.player.imagePosition[0] + this.player.imageWidth - currentCast.imageSize[0] / 2;
    castImagePosition[1] = this.player.imagePosition[1] + this.player.imageHeight - currentCast.imageSize[1] / 2;

    const castSpeed = currentCast.speed;

    this.cast = new Spell(false, castSpeed, this.canvas, currentCast.url, currentCast.imageSize[0], currentCast.imageSize[1], castImagePosition, currentCast.spriteSize, currentCast.firstSpritePosition, currentCast.animationDelay, currentCast.framesAmount, currentCast.repeat);

    this.cast.active = true;
  }
}