import React, { useEffect, useState } from 'react';
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

const Home = () => {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/restaurants`).then((result) => {
      const nRestaurants = result.data;
      console.log(nRestaurants);
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
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
