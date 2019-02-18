import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

import {connect} from 'react-redux'

import { handleGenreChange } from '../actions/action'


/**
* JSS style css rules used in the component
*/
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 195
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  checkBox: {
    color: '#0a1c38ad',
    '&$checked': {
      color: '#0a1c38',
    },
  },
  checked: {},
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

class MultiSelect extends React.Component {
  state = {
    name: [],
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
    this.props.handleGenreChange(event.target.value)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        {
          /**
          * Form element to display the Genre selection box.
          * Genres to be displayed are fetched from the genres property of the state.
          */
        }
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">{this.props.tag}</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.props.genres.map( genre => (
              <MenuItem key={genre.id} value={genre.name}>
                <Checkbox checked={this.state.name.indexOf(genre.name) > -1} classes={{
                root: classes.checkBox,
                checked: classes.checked,
              }}/>
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </Select>

        </FormControl>

      </div>
    );
  }
}

MultiSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    genres: state.genres,
    filter: state.filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleGenreChange: (data) => dispatch( handleGenreChange(data) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(MultiSelect))
