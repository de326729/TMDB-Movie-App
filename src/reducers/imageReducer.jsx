import {SAVE_IMAGE_URL, SHOW_ERROR} from '../config/action-constants';

const initialState = {}


/**
* This reducer method is to store details related to image URL.
* The image URL is constructed from the result of the Configuration API of the TMDB API Service.
*/

export const imageReducer = (state = initialState, action) => {

  switch (action.type) {

    case SAVE_IMAGE_URL:
      return {
         "base_url": action.data.images.base_url,
         "secure_base_url": action.data.images.secure_base_url,
         "backdrop_sizes": action.data.images.backdrop_sizes,
         "poster_sizes": action.data.images.poster_sizes,
      };

    default:
      return state;
  }

}
