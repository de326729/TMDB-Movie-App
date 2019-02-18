import React from 'react';
import {connect} from 'react-redux'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import LensIcon from '@material-ui/icons/LensOutlined';

import { handleRatingChange } from '../actions/action'


/**
* JSS style css rules used in the component
*/
const styles = {
  root: {
    width: 195,
    padding: 10,
    marginBottom: 15
  },
  slider: {
    padding: '22px 0px',
  },
  thumbIcon: {
    borderRadius: '50%',
  },
  thumbIconWrapper: {
    backgroundColor: '#fff',
  },
  sliderText: {
    backgroundColor: '#0a1c3873',
    borderRadius: 25,
    paddingRight: 25,
    paddingLeft: 10,
    position: 'relative',
    right: 10,
    top: -5
  },
  lensIconStyle: {
    width: 15,
    height: 12,
    position: 'relative',
    top: -8,
    right: 2,
    color: '#0a1c38',
  }
};


{
  /**
  * SLider component for the filtering movies based on their rating.
  */
}

class CustomIconSlider extends React.Component {

  state = {
    value: 3,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.handleRatingChange(this.state.value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Typography id="slider-image">{this.props.tag}</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          aria-labelledby="slider-image"
          onChange={this.handleChange}
          min={0}
          max={10}
          step={0.5}
          thumb={
            <div>
              <LensIcon className={classes.lensIconStyle} />
              <div className={classes.sliderText} >{value}</div>
            </div>
          }
        />
      </div>
    );
  }
}

CustomIconSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    filter: state.filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleRatingChange: (data) => dispatch( handleRatingChange(data) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomIconSlider))
