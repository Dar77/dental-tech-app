import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SimpleSelect from './SimpleSelect';
import WaxField from './WaxField';
import ResponsiveDialog from './ResponsiveDialog';
import RemoveAlloyDialog from './RemoveAlloyDialog';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = {
  card: {
    maxWidth: 345,
    margin: 25,
  },
  media: {
    //object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function MediaCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Gold dental alloy'
          className={classes.media}
          height='140'
          image={props.image}
          title='Gold dental alloy'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.title}
          </Typography>
          <Typography component='p'>
            {props.text}
          </Typography>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.alloyUsed}
          </Typography>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.wax}
          </Typography>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.result}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {props.showAddAlloy === true?
          <div>
            <SimpleSelect />
            <ResponsiveDialog />
            <RemoveAlloyDialog />
          </div>: ''
        }
        {props.weight === true?
          <div>
            <WaxField />
          </div>: ''
        }
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);

//const MediaCard = connect(mapStateToProps)(ConnectedMediaCard);
//export default withStyles(styles)(MediaCard);