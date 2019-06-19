import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from './stars';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  card: {
    maxWidth: 600,
    marginTop: theme.spacing(2),
  },
  icon: {
    margin: theme.spacing(0),
  },
}));


const RestaurantCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={props.handleClick}>
        <CardMedia
          component="img"
          alt={props.name}
          height="140"
          image={props.imageUrl}
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
          <Rating rating={props.rating} />
          {
            props.rating > 0 ? `${props.rating} / 5` : ''
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RestaurantCard;
