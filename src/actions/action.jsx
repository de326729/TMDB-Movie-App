import { getNowPlayingMovieList, getGenreList, getImageUrl } from '../apis/api'
import {SAVE_NOW_PLAYING, SAVE_GENRE_LIST, SAVE_CURRENT_PLAYING, HANDLE_GENRE_CHANGE, SAVE_IMAGE_URL, HANDLE_RATING_CHANGE, SHOW_ERROR} from '../config/action-constants';

//action creators

/**
 * This action creator triggers an action object to store the list of genres fetched from Genre API into the state.
 * @name saveGenresList
 */
const saveGenresList = (list) => {
  return {
    type: SAVE_GENRE_LIST,
    list
  }
}

/**
 * This action creator triggers an action object to store the list of npw playing movies fetched from Now Playing API into the state.
 * @name saveNowPlaying
 */
const saveNowPlaying = (list) => {
  return {
    type: SAVE_NOW_PLAYING,
    movieData: list
  }
}

/**
 * This action creator triggers an action object to store the filtered list of movies into the state. These movies are filtered based on the Genres and Rating selection in the filter section.
 * @name saveCurrentPlaying
 */
export const saveCurrentPlaying = (list) => {
  return {
    type: SAVE_CURRENT_PLAYING,
    movieData: list
  }
}

/**
 * This action creator triggers an action object to store the details of the Configuration API which is used to create the image url.
 * @name saveImageUrl
 */
const saveImageUrl = (data) => {
  return {
    type: SAVE_IMAGE_URL,
    data
  }
}

/**
 * This action creator triggers an action object to store the array of genres selected in the Genre selection form element.
 * @name handleGenreChange
 */
export const handleGenreChange = (data) => {
  return {
    type: HANDLE_GENRE_CHANGE,
    data
  }
}

/**
 * This action creator triggers an action object to store the rating value selected in the Rating selection form element.
 * @name handleRatingChange
 */
export const handleRatingChange = (data) => {
  return {
    type: HANDLE_RATING_CHANGE,
    data
  }
}

/**
 * This action creator triggers an action object to trigger SHOW_ERROR action object
 * @name showError
 */
const showError = (error) => {
  return {
    type: SHOW_ERROR,
    error
  }
}


//async handlers

/**
 * This function makes an API call to TMDB Movie Genre api and store the response in the states.
 * The response contains details of the list of genres for movies.
 * @name fetchGenreList
 */
export const fetchGenreList = () => {
  return (dispatch, getState) => {
    return getGenreList().then((res) => {
      dispatch(saveGenresList(res.genres));
    })
    .catch((err) => {
      dispatch(showError(err));
    })
  }
}


/**
 * This function makes an API call to TMDB Now Playing api and store the response in the states
 * The response contains details of the first page of the now playing movies
 * @name fetchNowPlayingMovieList
 * @param {number} pageNumber any number
 */
export const fetchNowPlayingMovieList = (pageNumber = 1) => {
  return (dispatch, getState) => {
    return getNowPlayingMovieList(pageNumber).then((res) => {
      dispatch(saveNowPlaying(res));
      dispatch(saveCurrentPlaying(res));
    })
    .catch((err) => {
      dispatch(showError(err));
    })
  }
}


/**
 * This function makes an API call to TMDB configuration api and store the response in the states
 * The response contains details of the image URL to be called for fetching movie images.
 * @name fetchImageUrl
 */
export const fetchImageUrl = () => {
  return (dispatch, getState) => {
    return getImageUrl().then((res) => {
      dispatch(saveImageUrl(res));
    })
    .catch((err) => {
      dispatch(showError(err));
    })
  }
}
