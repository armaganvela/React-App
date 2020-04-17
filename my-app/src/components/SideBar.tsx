import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Speaker from '@material-ui/icons/Speaker';
import Chat from '@material-ui/icons/Chat';
import Public from '@material-ui/icons/Public';
import HomeWork from '@material-ui/icons/HomeWork';
import { history, routes } from '../config/router';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
  open: boolean;
  onOpenDrawer: () => void;
}

export default function SwipeableTemporaryDrawer(props: Props) {
  const classes = useStyles();

  const { pathname } = useLocation();

  const toggleDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    props.onOpenDrawer();
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        <ListItem button onClick={() => history.push(routes["Camps"].path!.toString())}
          selected={pathname === routes["Camps"].path!.toString()}>
          <ListItemIcon><HomeWork /></ListItemIcon>
          <ListItemText primary='Camps' />
        </ListItem>
        <ListItem button onClick={() => history.push(routes["Talks"].path!.toString())}
          selected={pathname === routes["Talks"].path!.toString()}>
          <ListItemIcon><Chat /></ListItemIcon>
          <ListItemText primary='Talks' />
        </ListItem>
        <ListItem button onClick={() => history.push(routes["Speakers"].path!.toString())}
          selected={pathname === routes["Speakers"].path!.toString()}>
          <ListItemIcon><Speaker /></ListItemIcon>
          <ListItemText primary='Speakers' />
        </ListItem>
        <ListItem button onClick={() => history.push(routes["Countries"].path!.toString())}
          selected={pathname === routes["Countries"].path!.toString()}>
          <ListItemIcon><Public /></ListItemIcon>
          <ListItemText primary='Countries' />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor='top'
          open={props.open}
          onClose={toggleDrawer()}
          onOpen={toggleDrawer()}
        >
          {list('top')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}