import React, { Component } from 'react'
import {connect} from 'react-redux'

import { fetchGenreList, fetchNowPlayingMovieList, fetchImageUrl } from '../actions/action'
import MovieList from './MovieList'
import Layout from './Layout'
import ErrorBoundry from './ErrorBoundry'

class App extends Component {

  /**
  * This function is responsible for calling 3 different input APIs and to dispatch actions to store the api response in store.
  */
  componentDidMount(){
    this.props.dispatch(fetchImageUrl());
    this.props.dispatch(fetchGenreList());
    this.props.dispatch(fetchNowPlayingMovieList());
  }

  render() {

    return (
      <ErrorBoundry>
        <Layout>
          {
            /**
            * Children of layout component is rendered inside the 'main' element present in the Layout component
            */
          }
          <div  className="container movieWrapper">
            <MovieList />
          </div>
        </Layout>
      </ErrorBoundry>
    )
  }

}

function mapStateToProps(state) {
  return {
    nowPlaying: state.nowPlaying,
    genres: state.genres,
    images: state.images,
    error: state.error
  }
}

export default connect(mapStateToProps)(App)
