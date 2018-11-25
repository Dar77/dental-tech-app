import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//redux related
import { connect } from 'react-redux';
import { addWaxWeight } from '../actions/index';

//link redux to react
const mapDispatchToProps = dispatch => {
  return {
    addWaxWeight: waxWeight => dispatch(addWaxWeight(waxWeight))
  };
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class ConnectedWaxField extends React.Component {

  state = {
    errorNum: ''
  };

  handleChange = event => {
    const wax = event.target.value;
    const numCheck = isNaN(wax);
    //first check whether input value is not undefined and is a numerical value
    if (wax !== undefined && numCheck === false) {
      this.props.addWaxWeight({ wax });
      this.setState({ errorNum: '' });
    } else {
      this.setState({ errorNum: 'Please enter a number' });
    }
  };

  // prevent page reloading when enter is pressed in text field
  // ref: https://github.com/mui-org/material-ui/issues/5393
  catchReturn = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          autoFocus
          required
          id='waxWeight'
          label='Wax Weight'
          type='number'
          className={classNames(classes.textField, classes.dense)}
          onChange={this.handleChange}
          helperText={this.state.errorNum}
          onKeyPress={this.catchReturn}
          margin='dense'
        />
      </form>
    );
  }
}

ConnectedWaxField.propTypes = {
  classes: PropTypes.object.isRequired,
};

const WaxField = connect(null, mapDispatchToProps)(ConnectedWaxField);
export default withStyles(styles)(WaxField);