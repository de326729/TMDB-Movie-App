import React from 'react';
import {connect} from 'react-redux'

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import MultiSelect from './MultiSelect'
import Slider from './Slider'
import { saveCurrentPlaying } from '../actions/action'

const drawerWidth = 240;


/**
* JSS style css rules used in the component
*/
const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: '#0a1c38',
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  buttonMargin: {
    margin:10,
    backgroundColor: '#0a1c38',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0a1c3873'
    }
  },
  toolbar: {
    padding: '7px 20px',
  },
  toolbarLogo: {
    height: 50,
    width: 170
  },
  leftToolbarHeading: {
    padding: '7px 20px',
    textAlign: 'center',
    backgroundColor: '#0a1c38',
  },
  drawerPaper: {
    width: drawerWidth,
    background: 'rgb(207, 220, 226)',
    borderRight: '1px solid rgba(10, 28, 56, 0.64)'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingTop: 85,
    backgroundImage: 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)',
    minHeight: 612,
  },
  footer: {
    height: 50,
    backgroundColor: '#0a1c38',
    color: 'white',
    padding: 10,
    textAlign: 'right'
  },
});

class ResponsiveDrawer extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      mobileOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    return result;
  }

  /**
  * This function is responsible for calling 3 different input APIs and to dispatch actions to store the api response in store.
  * @name handleSubmit
  * This function handles the search functionality of the filter component.
  * The movie list present in the nowPlaying property of the state if filtered based on the selected ratings and genres.
  * This function also dispatches an event to store the filtered movies in the state so that they can be shown on the main screen.
  */
  handleSubmit = (e) => {
    e.preventDefault();
    const {genresSelected, ratingSelected} = this.props.filter;
    const movieStore = this.props.nowPlaying.results;

    const currentMovieStore = movieStore.filter( (movie, index) => {
      const currentMovieGenreArr = this.fetchGenresName(movie.genre_ids);
      if( movie.vote_average >= ratingSelected ){
        for(var i = 0; i < genresSelected.length; i++) {
          if(currentMovieGenreArr.indexOf(genresSelected[i]) === -1)
          return false;
        }
        return true;
      }
      return false;
    });

    this.props.dispatch(saveCurrentPlaying({
      results: currentMovieStore,
    }));

  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    {
      /**
      * drawer variable contains the JSX for displaying the left side panel.
      * This contains the logo, rating slider and the genres selection box.
      */
    }
    const drawer = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className={[classes.toolbar,classes.leftToolbarHeading].join(' ')}>
            <a href="/">
              <img src="images/logo-tmdb.png" className={classes.toolbarLogo}></img>
            </a>
          </div>
          <Divider />
          <Slider tag="By Rating"/>
          <Divider />
          <MultiSelect tag="By Genres" />
          <Divider />
          <Button type='submit' variant="contained" size="small" className={classes.buttonMargin} >
            Search
          </Button>
        </form>
      </div>
    );

    return (
      <React.Fragment>

        <div className={classes.root}>
          <CssBaseline />

            {
              /**
              * AppBar component is the top right navigation bar.
              */
            }
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
                >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                TMDB Movie App
              </Typography>
            </Toolbar>
          </AppBar>

          <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
                >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>

          {
            /**
            * main component contains the main display area of the application.
            * List of movies is shown here.
            */
          }
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.props.children}
          </main>

        </div>


        {
          /**
          * Below div contains the footer part of the application
          */
        }
        <div className={classes.footer}>
          <p>Copyright by TMDB Movie App</p>
        </div>

      </React.Fragment>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    filter: state.filter,
    nowPlaying: state.nowPlaying,
    genres: state.genres,
  }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer))
