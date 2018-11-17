import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//redux related
import { connect } from "react-redux";
import { selectedAlloy } from "../actions/index";
//map redux state to react props
const mapStateToProps = state => {
  return { alloys: state.alloys };
};

const mapDispatchToProps = dispatch => {
  return {
    selectedAlloy: selected => dispatch(selectedAlloy(selected))
  };
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ConnectedSimpleSelect extends React.Component {

  state = {
    selectedItem: this .state
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    let alloyUsed = event.target.value;
    if (event.target.value !== undefined) {
      this.props.selectedAlloy({ alloyUsed });
    };
  };

  render() {
    const { classes, alloys } = this.props;
    const { selectedItem } = this.state;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="alloy-simple">Select Alloy</InputLabel>
          <Select
            value={selectedItem}
            onChange={this.handleChange}
            inputProps={{
              name: 'selectedItem',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {alloys.map(el => (
              <MenuItem value={el.alloyName} key={el.id}>
                {el.alloyName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

ConnectedSimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleSelect = connect(mapStateToProps, mapDispatchToProps)(ConnectedSimpleSelect);
export default withStyles(styles)(SimpleSelect);