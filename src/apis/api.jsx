import axios from 'axios'

const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing';
const GENRE_LIST_URL = "https://api.themoviedb.org/3/genre/movie/list";
const CONFIGURATION_URL = "https://api.themoviedb.org/3/configuration";
const apiKey = 'api_key=2afb754820db7bbf3a225c394207e494';



/**
 * API: Get Now Playing Movies
 * @name getNowPlayingMovieList
 */
export const getNowPlayingMovieList = (pageNum) => {

  const requestUrl = `${NOW_PLAYING_URL}?${apiKey}&sort_by=popularity.desc&include_adult=false&page=${pageNum}`;

  return axios.get(requestUrl).then((res) => {
    return res.data;
  }, (res) => {
    throw new Error(res);
  })
}


/**
 * API: Get Genres List
 * @name getGenreList
 */
export const getGenreList = () =>{

  const requestUrl = `${GENRE_LIST_URL}?${apiKey}`;

  return axios.get(requestUrl).then((res) => {
    return res.data;
  }, (res) => {
    throw new Error(res);
  })
}


/**
 * API: Get Now Playing Movies List
 * @name getImageUrl
 */
export const getImageUrl = () =>{

  const requestUrl = `${CONFIGURATION_URL}?${apiKey}`;

  return axios.get(requestUrl).then((res) => {
    return res.data;
  }, (res) => {
    throw new Error(res);
  })
}
