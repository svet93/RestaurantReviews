import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CssBaseline } from '@material-ui/core';
import RestaurantCard from './restaurant_card';
import axios from '../utils/axios';
import { API_URL } from '../constants';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.gray,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Restaurants = (props) => {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const options = {};
    if (props.isOwner) {
      options.params = { isOwner: true };
    }
    axios.get(`${API_URL}/restaurants`, options).then((result) => {
      const nRestaurants = result.data;
      setRestaurants(nRestaurants);
    });
  }, []);
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        {restaurants.map(r => (
          <RestaurantCard
            key={r.id}
            id={r.id}
            name={r.name}
            description={r.description}
            imageUrl={r.imageUrl}
            rating={r.rating}
            handleClick={() => { props.history.push(`/${props.isOwner ? 'myRestaurants' : 'restaurants'}/${r.id}`); }}
          />
        ))}
      </div>
    </Container>
  );
};

export default withRouter(Restaurants);
