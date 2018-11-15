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
//redux related
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addAlloy } from "../actions/index";

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
      open: false
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDensity = this.handleChangeDensity.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChangeName(event) {
    console.log([event.target.id]: event.target.value, '[event.target.id]: event.target.value');
    this.setState({ [event.target.id]: event.target.value });
  }

  handleChangeDensity(event) {
    console.log([event.target.id]: event.target.value, '[event.target.id]: event.target.value');
    this.setState({ [event.target.id]: event.target.value });
  }

  handleClose(event) {
    event.preventDefault();
    const { alloyName, specificDensity } = this.state;
    const id = uuidv1();
    if (alloyName && specificDensity !== undefined) {
    this.props.addAlloy({ alloyName, specificDensity, id });
    };
    this.setState({ alloyName: '', specificDensity: '' }); // clear the text fields
    this.setState({ open: false });
    console.log(alloyName, specificDensity, id, 'addAlloy function');
  };

  render() {
    const { fullScreen } = this.props;
    const { alloyName } = this.state;
    const { specificDensity } = this.state;
    return (
      <div>
        <Button onClick={this.handleClickOpen} size='small' color='primary'>
          <AddCircle /> Add new Alloy
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Add new alloy"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Refer to your alloy's data sheet for details.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="alloyName"
              label="Alloy Name"
              type="text"
              value={alloyName}
              onChange={this.handleChangeName}
              fullWidth
            />
            <TextField
              margin="dense"
              required
              id="specificDensity"
              label="Specific Density"
              type="text"
              value={specificDensity}
              onChange={this.handleChangeDensity}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Save and Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConnectedResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const ResponsiveDialog = connect(null, mapDispatchToProps)(ConnectedResponsiveDialog);
export default withMobileDialog()(ResponsiveDialog);



//REMOVE
/*
// src/components/Form.js
// src/components/Form.js
import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addAlloy } from "../actions/index";
const mapDispatchToProps = dispatch => {
  return {
    addAlloy: alloy => dispatch(addAlloy(alloy))
  };
};
class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addAlloy({ title, id });
    this.setState({ title: "" });
  }
  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;
*/