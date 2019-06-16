import React from 'react';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import Cookies from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AccountIcon from '@material-ui/icons/AccountCircle';
import * as actions from '../actions';

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  fullList: {
    width: 'auto',
  },
}));

const handleLogout = (e, logout) => {
  e.preventDefault();
  cookies.remove('token', { path: '/' });
  logout();
};

const ButtonAppBar = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {[
          { text: 'Restaurants', href: '/', icon: RestaurantIcon },
          { text: 'Account', href: '/account' },
        ].map((link, index) => (
          <ListItem button key={link.text}>
            <ListItemIcon>{index % 2 === 0 ? <RestaurantIcon /> : <AccountIcon />}</ListItemIcon>
            <Link href={link.href}><ListItemText primary={link.text} /></Link>
          </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <div className={classes.root}>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Yelpy
          </Typography>
          <Button
            color="inherit"
            onClick={e => handleLogout(e, props.logout)}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(null, actions)(ButtonAppBar);
