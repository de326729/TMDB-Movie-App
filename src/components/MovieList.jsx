import React, { Component } from 'react'
import {connect} from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';


/**
* JSS style css rules used in the component
*/
const styles = {
  card: {
    maxWidth: 345,
    boxShadow: 'none'
  },
  cardWrapper: {
    margin: '0 0 15px 0'
  },
  cardContent: {
    backgroundColor: '#0a1c38',
    minHeight: 200
  },
  genresList: {
    minHeight: 60,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'fill',
    padding: 25,
    backgroundColor: '#0a1c38',
    paddingTop: 30
  },
  chip: {
    margin: 2,
  },
  cardText: {
    color: 'white'
  }
};


class MovieList extends Component {

  /**
  * This function is responsible for calling 3 different input APIs and to dispatch actions to store the api response in store.
  * @name fetchGenresName
  * @param {number} genreArr an array containing the id numbers of the genres
  * @returns {array} an array cntaining the names of the genres that are present in the argument genreArr
  */
  fetchGenresName(genreArr){
    let result = [];
    if(this.props.genres.length == 0){
      return [];
    }
    result = this.props.genres.filter( (genreItem) => {
      return genreArr.includes(genreItem.id)
    });
    result = result.map( (item) => {
      return item.name
    });
    return result
  }

  render() {
    const {nowPlaying, genres, images} = this.props;

    /**
    * imageSize and imageUrl variables are used to construct the URL for fetching the image of the movies.
    * Details of the image URL are fetched from the configuration api responsive
    * imageSize - fetches the size of the image from the poster_sizes array of the response
    * imageUrl - fetches the url of the image from the secure_base_url property of the response
    */
    const imageSize = this.props.images.poster_sizes? this.props.images.poster_sizes[3] : 'w154';
    const imageUrl = `${this.props.images.secure_base_url}${imageSize}/`;

    const currentPlaying = nowPlaying.current;
    const { classes } = this.props;

    let cards;

    /**
    * movieList contains the list of movies that needs to be shown in the main section of the appliation
    */
    let movieList =  currentPlaying.results || [];

    /**
    * For every movie that needs to be shown, a card component is created and is stored in the cards variable.
    */
    cards = movieList.map( (movieItem, index) => {
      return (
        <div key={index} className={`col-xs-12 col-sm-12 col-md-6 col-lg-4 ${classes.cardWrapper}`}>

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={movieItem.title}
                className={classes.media}
                height="300"
                image={`${imageUrl}${movieItem.poster_path}`}
                title={movieItem.title}
                />
              <CardContent className={classes.cardContent}>
                <Typography className={classes.cardText} gutterBottom variant="h6" component="h6">
                  {movieItem.title}
                </Typography>
                <Typography className={classes.genresList} component="p">

                  {/**
                    * Genres for the movie is fetched and for every Genre of the movie, a Chip component is created and displayed
                    */}
                    {

                      this.fetchGenresName(movieItem.genre_ids).map( (genreItem, index) => {
                        return (
                          <Chip
                            key={index}
                            label={genreItem}
                            className={classes.chip}
                            component="a"
                            href={`#${genreItem}`}
                            clickable
                            />
                        )
                      })
                    }
                  </Typography>
                  <Typography className={classes.cardText} component="p">
                    Rating - {movieItem.vote_average}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        );
      });


      return(
        <React.Fragment>
          <div className="row">
            {
              /**
              * Here we are checking if there are any movies that needs to be shown on the main screen. If not, a note is shown.
              */
            }
            {
              this.props.nowPlaying.current.results.length == 0?
              <p> No movies available..</p>:
                cards
              }
            </div>
          </React.Fragment>
        )
      }
    }

    function mapStateToProps(state) {
      return {
        nowPlaying: state.nowPlaying,
        genres: state.genres,
        images: state.images
      }
    }

    export default connect(mapStateToProps)(withStyles(styles)(MovieList));
