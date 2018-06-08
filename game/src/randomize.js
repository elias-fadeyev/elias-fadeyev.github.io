export { getRandomNumber, getRandomData};

function getRandomNumber(amount) {
  return Math.floor(Math.random() * amount);
}

function getRandomData(dataObject) {
  const randomElementsObject = new Map();

  dataObject.forEach((dataValues, dataKey) => {
    randomElementsObject.set(dataKey, dataValues[getRandomNumber(dataValues.length)]);
  })
  return randomElementsObject;
}