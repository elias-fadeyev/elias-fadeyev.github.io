export const heroStates = new Map([
	['stay', {
		'action': 'stay',
    'imageSize': [65, 95],
    'spriteSize': [125, 185],
    'firstSpritePosition': [0, 0],
    'framesAmount': 7,	
	}],
  ['run', {
    'action': 'run',
    'imageSize': [75, 95],
    'spriteSize': [145, 185],
    'firstSpritePosition': [0, 185],
    'framesAmount': 14,	
  }],
  ['aim', {
    'action': 'aim',
    'imageSize': [65, 95],
    'spriteSize': [130, 185],
    'firstSpritePosition': [0, 370],
    'framesAmount': 12,	
  }],
  ['hit', {
    'action': 'hit',
    'imageSize': [95, 95],
    'spriteSize': [185, 185],
    'firstSpritePosition': [0, 555],
    'framesAmount': 8,	
  }],
]);

export const enemyNamesData = new Map([
  ['firstName', ['Злой', 'Коварный', 'Хитрый']],
  ['surname', ['Разбойник', 'Охотник', 'Пират']],
  ['lastName', ['Кряк', 'Шмяк', 'Рекс', 'Кекс']],
]);

export const enemyStates = new Map([
	['stay', {
		'action': 'stay',
    'imageSize': [75, 75],
    'spriteSize': [150, 150],
	}],
]);

export const enemyAppearancesData = new Map([
  ['head', 
    [{
      'firstSpritePosition': [0, 0],
      'framesAmount': 4,	
    }, {
      'firstSpritePosition': [0, 150],
      'framesAmount': 2,	
    }, {
      'firstSpritePosition': [0, 300],
      'framesAmount': 3,	
    }, {
      'firstSpritePosition': [0, 450],
      'framesAmount': 3,	
    }, ]],
  ['body', 
    [{
      'firstSpritePosition': [0, 600],
      'framesAmount': 1,	
    }, {
      'firstSpritePosition': [150, 600],
      'framesAmount': 1,	
    }, {
      'firstSpritePosition': [300, 600],
      'framesAmount': 1,	
    }, ]],
  ['legs', 
    [{
      'firstSpritePosition': [0, 750],
      'framesAmount': 1,	
    }, {
      'firstSpritePosition': [150, 750],
      'framesAmount': 1,	
    }, {
      'firstSpritePosition': [300, 750],
      'framesAmount': 1,	
    }, ]],
  ['weapon',  [{
    'firstSpritePosition': [0, 900],
    'framesAmount': 1,	
  }, {
    'firstSpritePosition': [150, 900],
    'framesAmount': 1,	
  }, {
    'firstSpritePosition': [300, 900],
    'framesAmount': 1,	
  }, ]],
]);
