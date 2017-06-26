/**
 * Created by Mak on 25/6/17.
 */
import { Fetch_Food, Receive_Food } from '../constants';

const initialState = {
  data: [],
  isFetching: false,
  isLoaded: false,
  error: null,
}

export default function foodReducer(state = initialState, {type, payload}) {
  switch (type) {
    case Fetch_Food:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case Receive_Food:
      return Object.assign({}, state, {
        data: payload.data,
        isFetching: false,
        isLoaded: true,
      })

    default:
      return state
  }

}