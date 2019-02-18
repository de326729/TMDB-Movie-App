import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    paddingTop: 100,
    paddingBottom: 100,
    margin: 100,
    textAlign: 'center',
    backgroundImage: 'linear-gradient(to right, #74ebd5 0%, #9face6 100%)',
    borderRadius: 25
  },
  errorImage: {
    height: 100
  }
});

function ErrorDesc(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <img className={classes.errorImage} src="images/error.png" />
        <Typography variant="h5" component="h3">
          Uh Oh! Something went wrong.
        </Typography>
        <Typography component="p">
          {props.error}
        </Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(ErrorDesc);
