import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import TextField from '@material-ui/core/TextField';
import DeleteAlloyChip from './DeleteAlloyChip';

class RemoveAlloyDialog extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      errorNum: ''
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose(event) {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen} size='small' color='primary'>
          <RemoveCircle /> Remove Alloy
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='remove-alloy-dialog-title'
        >
          <DialogTitle id='remove-alloy-dialog-title'>{'Remove alloy'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select the alloy you want to remove.
            </DialogContentText>
            <DeleteAlloyChip />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Save and Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

RemoveAlloyDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(RemoveAlloyDialog);