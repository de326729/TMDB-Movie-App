import {SAVE_NOW_PLAYING, SAVE_CURRENT_PLAYING, SHOW_ERROR} from '../config/action-constants';

const initialState = {
  page: 1,
  results: 0,
  total_pages: 0,
  total_results: 0,
  current: {
    results: []
  }
};

/**
* This reducer method is to store details related to list of movies fetched from the Now Playing API.
* The image URL is constructed from the result of the Configuration API of the TMDB API Service.
*/

export const nowPlayingReducer = (state = initialState, action) => {
  const {movieData} = action;

  switch (action.type) {
    case SAVE_NOW_PLAYING:
    return {
      page: movieData.page,
      results: [...movieData.results],
      total_pages: movieData.total_pages,
      total_results: movieData.total_results,
      current: state.current
    }

    case SAVE_CURRENT_PLAYING:
    return {
      ...state,
      current: {
        results: [...movieData.results],
      }
    }

    default:
    return state;
  }

}
