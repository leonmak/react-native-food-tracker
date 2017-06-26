/**
 * Created by Mak on 25/6/17.
 */
import { Fetch_Food, Receive_Food, Select_Food } from '../constants';
import { getFoodRef } from '../../utils/firebase';
import { getFoodImage } from '../../utils/image';

export function receiveFood(data) {
  return {
    type: Receive_Food,
    payload: {
      data
    },
  }
}

export function fetchFood() {
  return {
    type: Fetch_Food
  }
}

export function getFoods() {
  return (dispatch) => {
    dispatch(fetchFood());
    getFoodRef().once('value', snapshots => {
      if (!snapshots.exists()) {
        return
      }
      const foods = Object.values(snapshots.val()).sort((a, b) => b.time - a.time)
      const getFoodImages = foods.map(food => getFoodImage(food.name)
        .then(res => res.json())
        .then(data => data.hits[~~(Math.random() * data.hits.length)].previewURL)
      )
      Promise.all(getFoodImages).then(imageUrls => {
        foods.forEach((_ , idx) => {
          foods[idx].image = imageUrls[idx];
        })
        dispatch(receiveFood(foods))
      })
    })
  }
}

export function selectFood(food) {
  return {
    type: Select_Food,
    payload: {
      data: food
    }
  }
}