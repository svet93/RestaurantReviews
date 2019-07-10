import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from './stars';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  card: {
    width: 400,
    maxWidth: 600,
    marginTop: theme.spacing(1),
  },
  icon: {
    margin: theme.spacing(0),
  },
}));


const ReviewCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Rating rating={props.rating} />
        {
          props.rating > 0 ? `${props.rating} / 5` : ''
        }
        <Typography variant="body2" component="p">
          {props.body}
        </Typography>
        <Typography gutterBottom component="p" color="textSecondary">
          {props.name}
        </Typography>
        {props.reply
          && (
            <React.Fragment>
              <Typography variant="body2" color="textSecondary" component="p">
                Owner Reply:
              </Typography>
              <Typography variant="body2" color="secondary" component="p">
                {props.reply}
              </Typography>
            </React.Fragment>
          )
        }
        {(!props.reply && props.isOwner)
          && (
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={e => props.onFabClick(props.id)}
            >
              <AddIcon />
            </Fab>
          )
        }
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
