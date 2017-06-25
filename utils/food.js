/**
 * Created by Mak on 25/6/17.
 */
const food = require('../data/food.json').food;
import _ from 'lodash';

export const getFoodsFromAnnotations = annotations => {
  const descriptions = annotations.responses[0].textAnnotations.map(item => item.description);
  const foods = descriptions
    .map(description => findFoodFromLine(description))
    .filter(food => food !== null)
  return _.uniqBy(foods, 'shortName');
}

export const findFoodFromLine = description => {
  const words = description.replace(/[^\w\s]/gi, '').split(' ');
  const foods = _.flatMap(
    words.filter(word => word.match(/\d+/g) === null),
    word => findFoodsByShortname(word)
  )
  return foods && foods.length > 0 ? foods[0] : null;
}

export const findFoodsByShortname = word => {
  const wordLower = word.toLowerCase();
  return food.filter(foodObj =>
    foodObj.shortName === wordLower || foodObj.shortName.substring(0, foodObj.shortName.length - 1) === wordLower);
}