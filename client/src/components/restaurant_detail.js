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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Rating from 'material-ui-rating';
import ReviewCard from './review_card';
import Modal from './review_modal';
import Stars from './stars';
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
    reply: '',
  });

  const [open, setOpen] = React.useState(false);
  const [openReply, setOpenReply] = React.useState(false);
  const [currentReply, setCurrentReply] = React.useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenReplyModal = (reviewId) => {
    setOpenReply(true);
    setCurrentReply(reviewId);
  };

  const handleCloseReplyModal = () => {
    setOpenReply(false);
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

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    setOpenReply(false);
    await axios.post(`${API_URL}/reviews/${currentReply}/comment`, {
      body: values.reply,
    });
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Modal
        form={
          (
            <React.Fragment>
              <Rating
                value={newRating}
                max={5}
                onChange={value => handleRatingChange(value)}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Comment"
                multiline
                rows="2"
                rowsMax="4"
                value={values.newComment}
                onChange={handleChange('newComment')}
                className={classes.textField}
                margin="normal"
                inputProps={{ maxLength: 250 }}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleReviewSubmit}
              >
                Add
              </Button>
            </React.Fragment>
          )
        }
        open={open}
        handleClose={handleCloseModal}
      />
      <Modal
        form={
        (
          <React.Fragment>
            <TextField
              id="standard-multiline-flexible"
              label="Reply"
              multiline
              rows="2"
              rowsMax="4"
              value={values.reply}
              onChange={handleChange('reply')}
              className={classes.textField}
              margin="normal"
              inputProps={{ maxLength: 250 }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleReplySubmit}
            >
              Add
            </Button>
          </React.Fragment>
        )
      }
        open={openReply}
        handleClose={handleCloseReplyModal}
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {restaurant.name}
        </Typography>
        <Box>
          <Stars rating={rating} />
        </Box>
        {!props.isOwner
          && (
            <Grid container spacing={5} className={classes.review}>
              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">
                  Best
                </Typography>
                <ReviewCard
                  isOwner={props.isOwner}
                  onFabClick={handleOpenReplyModal}
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
                  isOwner={props.isOwner}
                  onFabClick={handleOpenReplyModal}
                  className={classes.review}
                  id={lowestReview.id}
                  name={lowestReview.name}
                  body={lowestReview.body}
                  rating={lowestReview.stars}
                  reply={lowestReview.reply}
                />
              </Grid>
            </Grid>
          )
        }
        {reviews.length ? reviews.map(r => (
          <ReviewCard
            key={r.id}
            isOwner={props.isOwner}
            onFabClick={handleOpenReplyModal}
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
      {!props.isOwner
        && (
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={handleOpenModal}
        >
          <AddIcon />
        </Fab>
        )
      }
    </Container>
  );
};

export default withRouter(RestaurantDetail);
