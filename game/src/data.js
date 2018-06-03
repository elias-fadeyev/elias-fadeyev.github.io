export const enemyNamesData = new Map([
  ['firstName', ['Злой', 'Коварный', 'Хитрый']],
  ['surname', ['Разбойник', 'Охотник', 'Пират']],
  ['lastName', ['Джек', 'Макс', 'Рекс', 'Кекс']],
]);

export const enemyAppearancesData = new Map([
  ['head', ['head1', 'head2', 'head3']],
  ['body', ['body1', 'body2', 'body3']],
  ['legs', ['legs1', 'legs2', 'legs3']],
  ['weapon', ['axe', 'sword', 'stick']],
]);

export const heroStates = new Map([
	['stay', {
		'action': 'stay',
    'imageSize': [65, 95],
    'spriteSize': [125, 185],
    'firstSpritePosition': [0, 0],
    'imageAmount': 7,	
	}],
  ['run', {
    'action': 'run',
    'imageSize': [75, 95],
    'spriteSize': [145, 185],
    'firstSpritePosition': [0, 185],
    'imageAmount': 14,	
  }],
]);