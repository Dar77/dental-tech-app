import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
//redux related
import { connect } from 'react-redux';
import { deleteAlloy, selectedAlloy } from '../actions/index';
//map redux state to react props
const mapStateToProps = state => {
  return { alloys: state.alloys, selected: state.selected };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteAlloy: deleted => dispatch(deleteAlloy(deleted)),
    selectedAlloy: selected => dispatch(selectedAlloy(selected))
  };
};

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class ConnectedDeleteAlloyChip extends React.Component {

  handleDelete = data => () => {
    const removed = data.alloyName;
    if (data.alloyName !== undefined) {
      let index = this.props.alloys.indexOf(data);
      this.props.deleteAlloy({ index });
      //check if the alloy being deleted is also the currently selected alloy, if true, clear the data
      if (this.props.selected.alloyUsed === removed) {
        let alloyUsed = '';
        let data = 0;
        this.props.selectedAlloy({ alloyUsed, data });
      }
    };
  }

  render() {
    const { classes, alloys } = this.props;
    console.log(alloys, 'alloys');

    return (
      <React.Fragment>
      {alloys.map(data => (
        <Chip
          label={data.alloyName}
          onDelete={this.handleDelete(data)}
          className={classes.chip}
          color='secondary'
        />
      ))}
      </React.Fragment>
    );
  }
}

ConnectedDeleteAlloyChip.propTypes = {
  classes: PropTypes.object.isRequired,
};


const DeleteAlloyChip = connect(mapStateToProps, mapDispatchToProps)(ConnectedDeleteAlloyChip);
export default withStyles(styles)(DeleteAlloyChip);