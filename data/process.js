/**
 * Created by Mak on 24/6/17.
 */
const file = require('./expiry-dates.json');
const fs = require('fs');

const getBeforeHyphen = string => string.indexOf(" - ") > -1 ? string.substring(0, string.indexOf(" - ")) : string;

const getFoodId = foodName => {
    const first = getBeforeHyphen(foodName);
    const idx = first.indexOf(",") > -1 ? first.indexOf(",") : first.length;
    const name = first.substring(0, idx);
    return name;
};

const extendFoodId = food => Object.assign({}, food, {shortName: getFoodId(food.name)});

const sortAlpha = (a, b) => a.shortName.localeCompare(b.shortName);

const result = { food: file.data.map(extendFoodId).sort(sortAlpha) };

// console.log(result);
const json = JSON.stringify(result);
fs.writeFile('data.json', json, 'utf8',  err => {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

// json format:
// data:
// [food]:
// - freezer
// - name
// - pantry
// - refrigerator
// - shortName