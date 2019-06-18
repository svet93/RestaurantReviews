import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { CssBaseline } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ReviewCard from './review_card';
import ReviewModal from './review_modal';
import Rating from './stars';
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
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  review: {
    margin: theme.spacing(3),
  },
}));

const RestaurantDetail = (props) => {
  const { id } = props.match.params;
  const classes = useStyles();
  const [restaurant, setRestaurant] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [lowestReview, setLowestReview] = useState([]);
  const [highestReview, setHighestReview] = useState([]);
  const [rating, setRating] = useState([]);

  // modal fields
  const [newRating, setNewRating] = useState(3);
  const [values, setValues] = React.useState({
    newComment: '',
  });

  const [open, setOpen] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleRatingChange = (stars) => {
    setNewRating(stars);
  };

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const loadData = () => {
    axios.get(`${API_URL}/restaurants/detail/${id}`).then((result) => {
      const restaurantDetail = result.data;
      setReviews(restaurantDetail.mostRecent);
      setLowestReview(restaurantDetail.lowestReview);
      setHighestReview(restaurantDetail.highestReview);
      setRating(restaurantDetail.rating);
      setRestaurant(restaurantDetail.restaurant);
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    await axios.post(`${API_URL}/reviews/${id}`, {
      stars: newRating,
      body: values.newComment,
    });
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <ReviewModal
        open={open}
        stars={newRating}
        comment={values.newComment}
        handleClose={handleCloseModal}
        handleRatingChange={handleRatingChange}
        handleChange={handleChange}
        handleSubmit={handleReviewSubmit}
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {restaurant.name}
        </Typography>
        <Box>
          <Rating rating={rating} />
        </Box>
        <Grid container spacing={5} className={classes.review}>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">
              Best
            </Typography>
            <ReviewCard
              className={classes.review}
              id={highestReview.id}
              name={highestReview.name}
              body={highestReview.body}
              rating={highestReview.stars}
              reply={highestReview.reply}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">
              Worst
            </Typography>
            <ReviewCard
              className={classes.review}
              id={lowestReview.id}
              name={lowestReview.name}
              body={lowestReview.body}
              rating={lowestReview.stars}
              reply={lowestReview.reply}
            />
          </Grid>
        </Grid>
        {reviews.length ? reviews.map(r => (
          <ReviewCard
            key={r.id}
            id={r.id}
            name={r.name}
            body={r.body}
            rating={r.rating}
            reply={r.reply}
          />
        ))
          : (
            <Typography variant="body2" color="primary" component="p">
              No Reviews yet. Why not leave one?
            </Typography>
          )
        }
      </div>
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        onClick={handleOpenModal}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default withRouter(RestaurantDetail);
