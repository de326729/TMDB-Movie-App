import * as redux from 'redux'
import thunk from 'redux-thunk'

import { nowPlayingReducer } from '../reducers/nowPlayingReducer';
import { genreReducer } from '../reducers/genreReducer';
import { imageReducer } from '../reducers/imageReducer';
import { filterReducer } from '../reducers/filterReducer';
import { errorReducer } from '../reducers/errorReducer';


/**
* This function is responsible for creating and initialising the store of the application. This store is then returned from the function.
*/

const configure = (initialState = {}) => {

  /**
  * Here we create the root reducer by combining below given sub reducers.
  */

  const reducer = redux.combineReducers({
    nowPlaying: nowPlayingReducer,
    genres: genreReducer,
    images: imageReducer,
    filter: filterReducer,
    error: errorReducer
  });


  /**
  * This is to create the redux store.
  */

  const store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk)
  ));

  return store;

};

export default configure;
