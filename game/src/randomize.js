export { getRandomNumber, getRandomData};

function getRandomNumber(last, first = 0) {
  return first + Math.floor(Math.random() * (last - first));
}

function getRandomData(dataObject) {
  const randomElementsObject = new Map();

  dataObject.forEach((dataValues, dataKey) => {
    randomElementsObject.set(dataKey, dataValues[getRandomNumber(dataValues.length)]);
  })
  return randomElementsObject;
}