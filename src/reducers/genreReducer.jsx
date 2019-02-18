import {SAVE_GENRE_LIST, SHOW_ERROR} from '../config/action-constants';

const initialState = []


/**
* This reducer method is to store the list of genres fetched from the Genre API.
*/

export const genreReducer = (state = initialState, action) => {

  switch (action.type) {

    case SAVE_GENRE_LIST:
      return [...action.list];

    default:
      return state;
  }

}
