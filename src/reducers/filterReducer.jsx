import {HANDLE_GENRE_CHANGE, HANDLE_RATING_CHANGE, SHOW_ERROR} from '../config/action-constants';

const initialState = {
  "ratingSelected": 3,
  "genresSelected": []
}

/**
* This reducer method is to handle state related to filter components i.e. Slider and Multiselect component.
*/

export const filterReducer = (state = initialState, action) => {

  switch (action.type) {

    case HANDLE_GENRE_CHANGE:
      return {
        "genresSelected": action.data,
       "ratingSelected": state.ratingSelected,
      };

    case HANDLE_RATING_CHANGE:
      return {
         "genresSelected": state.genresSelected,
         "ratingSelected": action.data,
      };

    default:
      return state;
  }

}
