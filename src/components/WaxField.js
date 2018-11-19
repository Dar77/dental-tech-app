import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//redux related
import { connect } from "react-redux";
import { addWaxWeight } from "../actions/index";

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

  handleChange = event => {
    const wax = event.target.value;
    if (wax !== undefined) {
      this.props.addWaxWeight({ wax });
    };
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="waxWeight"
          label="Wax Weight"
          className={classNames(classes.textField, classes.dense)}
          onChange={this.handleChange}
          margin="dense"
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