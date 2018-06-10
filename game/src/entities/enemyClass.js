import Character from './characterClass';

export default class Enemy extends Character {
  constructor(...args) {
    super(...args);
    this.imageReverse = true;
    this.spriteDirectionChangeable = true;
    this.maxHealth = this.healthPoints;
  }

  getFullName() {
    return `${this.name.get('firstName')} ${this.name.get('surname')} ${this.name.get('lastName')}`;
  }

  renderImage(canvas, ctx) {
    this.renderBodyParts(canvas, ctx, 'legs', 0, 0);
    this.renderBodyParts(canvas, ctx, 'body', 0, -23);
    this.renderBodyParts(canvas, ctx, 'weapon', -35, -33);
    this.renderBodyParts(canvas, ctx, 'head', 0, -57);
  }

  renderBodyParts(canvas, ctx, part, dx, dy) {
    const bodyPart = this.appearance.get(part);
    
    this.spritePosition = bodyPart.firstSpritePosition;
    this.framesAmount = bodyPart.framesAmount;
    
    this.setImagePosition(dx, dy);
    super.renderImage(canvas, ctx);    
    this.setImagePosition(-dx, -dy);
  }
}