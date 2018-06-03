import Character from './character';

export default class Enemy extends Character {
  getFullName() {
    return `${this.name.get('firstName')} ${this.name.get('surname')} ${this.name.get('lastName')}`;
  }
}