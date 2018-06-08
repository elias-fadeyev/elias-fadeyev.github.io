export { enemyNames, enemyStates, enemyAppearances };

const enemyNames = new Map([
  ['firstName', ['Злой', 'Коварный', 'Хитрый']],
  ['surname', ['Разбойник', 'Охотник', 'Пират']],
  ['lastName', ['Кряк', 'Шмяк', 'Рекс', 'Кекс']],
]);

 const enemyStates = new Map([
	['stay', {
		'action': 'stay',
    'imageSize': [75, 75],
    'spriteSize': [150, 150],
    'animationDelay': 1500,
	}],
]);

 const enemyAppearances = new Map([
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
  ['weapon',
      [{
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
