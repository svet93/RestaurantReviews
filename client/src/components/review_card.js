import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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
      </CardContent>
    </Card>
  );
};

export default withRouter(ReviewCard);
