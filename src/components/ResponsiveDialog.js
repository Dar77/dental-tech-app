import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import AddCircle from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import uuidv1 from 'uuid'; // universally unique identifiers generator
//redux related
import { connect } from 'react-redux';
import { addAlloy } from '../actions/index';

//link redux to react
const mapDispatchToProps = dispatch => {
  return {
    addAlloy: alloy => dispatch(addAlloy(alloy))
  };
};

class ConnectedResponsiveDialog extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      errorNum: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDensity = this.handleChangeDensity.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChangeName(event) {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleChangeDensity(event) {
    //first check whether input value is a number
    if (isNaN(event.target.value)) {
      this.setState({ errorNum: 'Please enter a number' });
    } else {
      this.setState({ [event.target.id]: event.target.value });
      this.setState({ errorNum: '' });
    }
  };

  handleClose(event) {
    event.preventDefault();
    const { alloyName, specificDensity } = this.state;
    const id = uuidv1();
    if (alloyName && specificDensity !== undefined) {
    this.props.addAlloy({ alloyName, specificDensity, id });
    };
    this.setState({ alloyName: '', specificDensity: '' }); // clear the text fields
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    const { alloyName, specificDensity } = this.state;
    return (
      <div>
        <Button onClick={this.handleClickOpen} size='small' color='primary'>
          <AddCircle /> Add new Alloy
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='responsive-dialog-title'
        >
          <DialogTitle id='responsive-dialog-title'>{'Add new alloy'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Refer to your alloy's data sheet for details.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin='dense'
              id='alloyName'
              label='Alloy Name'
              type='text'
              value={alloyName}
              onChange={this.handleChangeName}
              fullWidth
            />
            <TextField
              margin='dense'
              required
              id='specificDensity'
              label='Specific Density'
              type='number'
              value={specificDensity}
              onChange={this.handleChangeDensity}
              helperText={this.state.errorNum}
              fullWidth
            />
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

ConnectedResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const ResponsiveDialog = connect(null, mapDispatchToProps)(ConnectedResponsiveDialog);
export default withMobileDialog()(ResponsiveDialog);