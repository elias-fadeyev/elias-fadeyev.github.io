export const heroStates = new Map([
	['stay', {
		'action': 'stay',
    'imageSize': [65, 95],
    'spriteSize': [125, 185],
    'firstSpritePosition': [0, 0],
    'framesAmount': 7,	
    'animationDelay': 2000,
	}],
  ['run', {
    'action': 'run',
    'imageSize': [75, 95],
    'spriteSize': [145, 185],
    'firstSpritePosition': [0, 185],
    'framesAmount': 14,	
    'animationDelay': 0,
  }],
  ['aim', {
    'action': 'aim',
    'imageSize': [65, 95],
    'spriteSize': [130, 185],
    'firstSpritePosition': [0, 370],
    'framesAmount': 12,	
    'animationDelay': 0,
  }],
  ['hit', {
    'action': 'hit',
    'imageSize': [95, 95],
    'spriteSize': [185, 185],
    'firstSpritePosition': [0, 555],
    'framesAmount': 8,	
    'animationDelay': 0,
  }],
]);

