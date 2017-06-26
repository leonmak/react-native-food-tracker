/**
 * Created by Mak on 25/6/17.
 */
const food = require('../data/food.json').food;
import _ from 'lodash';
import moment from 'moment';

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

export const closestExpiryDate = (name) => {
  const expiryDates = food
    .filter(item => item.shortName === name)
    .map(item => getClosestExpiredDate(item))
    .sort((a, b) => a.valueOf() - b.valueOf())
  return expiryDates.length > 0 && expiryDates[0];
}

export const expiredIn = (name, inNDays = 0) => {
  const expired = getExpiredFoods(name, inNDays)
    .map(expiredFood => getClosestExpiredDate(expiredFood))
    .sort((a, b) => a.valueOf() - b.valueOf());
  return expired.length > 0 && expired[0];
}

export const getClosestExpiredDate = item => {
  const mostExpired = moment().add(10, 'y');
  const expiryFreezer = item.freezer.length > 0 ? getExpiryDate(item.freezer, item.time) : mostExpired;
  const expiryPantry = item.pantry.length > 0 ? getExpiryDate(item.pantry, item.time): mostExpired;
  const expiryRefrigerator = item.refrigerator.length > 0 ? getExpiryDate(item.refrigerator, item.time): mostExpired;
  const greater = expiryFreezer.isBefore(expiryPantry) ? expiryFreezer : expiryPantry;
  return greater.isBefore(expiryRefrigerator) ? greater : expiryRefrigerator;
}

export const getExpiredFoods = (name, inNDays) => {
  const expired = food
    .filter(item => item.shortName === name)
    .filter(item => {
      const isFreezerExpired = item.freezer.length > 0 && isExpired(item.freezer, item.time, inNDays);
      const isPantryExpired = item.pantry.length > 0 && isExpired(item.pantry, item.time, inNDays);
      const isRefrigeratorExpired = item.refrigerator.length > 0 && isExpired(item.refrigerator, item.time, inNDays);
      return isFreezerExpired || isPantryExpired || isRefrigeratorExpired;
    });
  return expired;
}

export const isExpired = (timespan, startTime, days) => {
  const expiryDate = getExpiryDate(timespan, startTime);
  return moment().add(days, 'd').isAfter(expiryDate);
}

export const getExpiryDate = (timespan, startTime) => {
  const parts = timespan.split(" ");
  const number = parts[0].substring(0, 1);
  let word = parts[1];
  return moment(startTime).add(number, word);
}