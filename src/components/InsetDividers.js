import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grain from '@material-ui/icons/Grain';
import Timer from '@material-ui/icons/Timer';
import Palette from '@material-ui/icons/Palette';
import AllOut from '@material-ui/icons/AllOut';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function InsetDividers(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Avatar>
            <Grain />
          </Avatar>
          <ListItemText primary='Alloy' secondary='Calculate quantity' />
        </ListItem>
        <li>
          <Divider inset />
        </li>
        <ListItem>
          <Avatar>
            <AllOut />
          </Avatar>
          <ListItemText primary='Expansion' secondary='Ratios' />
        </ListItem>
        <li>
          <Divider inset />
        </li>
        <ListItem>
          <Avatar>
            <Timer />
          </Avatar>
          <ListItemText primary='Timer' secondary='Manage set times' />
        </ListItem>
        <Divider inset component='li' />
        <ListItem>
          <Avatar>
            <Palette />
          </Avatar>
          <ListItemText primary='Shade' secondary='Manage shades' />
        </ListItem>
      </List>
    </div>
  );
}

InsetDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetDividers);