import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MediaCard from './MediaCard';
//redux related
import { connect } from 'react-redux';
import { calculateAlloy, selectedAlloy, addWaxWeight } from '../actions/index';

//map redux state to react props
const mapStateToProps = state => {
  return { alloys: state.alloys, selected: state.selected, waxWeight: state.waxWeight, calculate: state.calculate };
};

const mapDispatchToProps = dispatch => {
  return {
    calculateAlloy: calculate => dispatch(calculateAlloy(calculate)),
    selectedAlloy: selected => dispatch(selectedAlloy(selected)),
    addWaxWeight: waxWeight => dispatch(addWaxWeight(waxWeight))
  };
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

function getSteps() {
  return ['Select an alloy', 'Wax weight', 'Calculate Alloy Weight'];
}

function getStepContent(step, alloyUsed, wax, result) {
  let text;
  let title;
  let img;
  let showAddAlloy;
  switch (step) {
    case 0:
      title = 'Alloy';
      text = 'Select the alloy you are using';
      img = '/images/gold-alloy-color.jpg';
      showAddAlloy = true;
      return  <MediaCard text={text} title={title} showAddAlloy={showAddAlloy} alloyUsed={alloyUsed} weight={false} image={img} />;
    case 1:
      title = 'Wax';
      text = 'Weigh the wax pattern and reservoir';
      img = '/images/wax-bridges.jpg';
      showAddAlloy = false;
      return <MediaCard text={text} title={title} showAddAlloy={showAddAlloy} wax={wax? `${wax} grams` : ''} weight={true} image={img} />;
    case 2:
      title = 'Alloy Weight';
      text = 'You will need to use this much alloy for your casting';
      img = '/images/gold-alloy-color.jpg';
      showAddAlloy = false;
      return <MediaCard text={text} title={title} showAddAlloy={showAddAlloy} result={result && result !== 0.0? `${result} grams` : ''} weight={false} image={img} />;
    default:
      return 'Unknown step';
  }
}

class ConnectedVerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
    // when the calculate step is reached, calculate the weight of alloy needed
    if (this.state.activeStep === 1 && this.props.selected.data !== undefined && this.props.waxWeight.wax !== undefined
      && this.props.waxWeight.wax !== 0) {
      // calculate the weight of alloy needed
      const calculate = this.props.selected.data * this.props.waxWeight.wax;
      const result = calculate.toFixed(1);
      // add the result to redux state
      this.props.calculateAlloy({ result });
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
    let alloyUsed = '';
    let data = 0;
    let wax = 0;
    let result = 0;
    // reset redux managed state for all stages
    this.props.selectedAlloy({ alloyUsed, data });
    this.props.addWaxWeight({ wax });
    this.props.calculateAlloy({ result });
  };

  render() {
    const { classes, selected, waxWeight, calculate } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {getStepContent(index, selected.alloyUsed, waxWeight.wax, calculate.result)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

ConnectedVerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

const VerticalLinearStepper = connect(mapStateToProps, mapDispatchToProps)(ConnectedVerticalLinearStepper);
export default withStyles(styles)(VerticalLinearStepper);