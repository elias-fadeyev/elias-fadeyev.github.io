import Character from './characterClass';

export default class Enemy extends Character {
  constructor(...args) {
    super(...args);
    this.imageReverse = true;
    this.spriteDirectionChangeable = true;
    this.maxHealth = this.healthPoints;

    //this.legs = {};
    //this.body = {};
    //this.head = {};
    //this.weapon = {};
  }

  getFullName() {
    return `${this.name.get('firstName')} ${this.name.get('surname')} ${this.name.get('lastName')}`;
  }

  renderImage() {
    this.renderBodyParts('legs', 0, 0);
    this.renderBodyParts('body', 0, -23);
    this.renderBodyParts('weapon', -35, -33);
    this.renderBodyParts('head', 0, -57);
  }

  renderBodyParts(part, dx, dy) {
    const bodyPart = this.appearance.get(part);
    
    this.spritePosition = bodyPart.firstSpritePosition;
    this.framesAmount = bodyPart.framesAmount;
    
    this.setImagePosition(dx, dy);
    super.renderImage();    
    this.setImagePosition(-dx, -dy);
  }

  moveToPosition(...args) {
    if (this.imagePosition[0] < -150) {
      this.imagePosition[0] = this.canvas.width + 200;
      this.isMoving = false;
    }

    super.moveToPosition(...args);
  }
}