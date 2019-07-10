import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
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
  const [rating, setRating] = useState([]);
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

  const handleFilterChange = (e) => {
    const nRating = e.target.value;
    setRating(nRating);

    const options = {
      params: {
        rating: nRating,
      },
    };
    axios.get(`${API_URL}/restaurants`, options).then((result) => {
      const nRestaurants = result.data;
      setRestaurants(nRestaurants);
    });
  };

  const handleClick = (id, reviews) => {
    if (!reviews) {
      return;
    }
    props.history.push(`/${props.isOwner ? 'myRestaurants' : 'restaurants'}/${id}`);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Select
        value={rating}
        onChange={handleFilterChange}
        input={<Input name="rating" id="rating-helper" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>1+</MenuItem>
        <MenuItem value={2}>2+</MenuItem>
        <MenuItem value={3}>3+</MenuItem>
        <MenuItem value={4}>4+</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
      <div className={classes.paper}>
        {restaurants.map(r => (
          <RestaurantCard
            key={r.id}
            id={r.id}
            name={r.name}
            description={r.description}
            imageUrl={r.imageUrl}
            rating={r.rating}
            handleClick={() => handleClick(r.id, r.rating)}
          />
        ))}
      </div>
    </Container>
  );
};

export default withRouter(Restaurants);
