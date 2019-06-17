import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { amber } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  card: {
    maxWidth: 600,
  },
  icon: {
    margin: theme.spacing(0),
  },
}));

function StarIcon(props) {
  return (
    <SvgIcon {...props} fontSize="large">
      <path d="M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z" />
    </SvgIcon>
  );
}

const RestaurantCard = (props) => {
  const classes = useStyles();

  const floored = Math.floor(props.rating);
  const remainder = props.rating - floored;
  let remainderApplied = false;
  const stars = [];
  for (let i = 0; i < floored; i++) {
    stars.push(<StarIcon key={i} className={classes.icon} style={{ color: amber[400] }} />);
  }
  for (let i = floored; i < 5; i++) {
    if (!remainderApplied && remainder > 0.0) {
      remainderApplied = true;
      const percentage = remainder * 100;
      stars.push(
        <StarIcon
          key={i}
          style={{ color: amber[400] }}
          className={classes.icon}
          component={svgProps => (
            <svg {...svgProps}>
              <defs>
                <linearGradient id="gradient1">
                  <stop offset="0%" stopColor={amber[400]} />
                  <stop offset={`${percentage}%`} stopColor={amber[400]} />
                  <stop offset={`${percentage}%`} stopColor="white" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>
              </defs>
              {React.cloneElement(svgProps.children[0], {
                fill: 'url(#gradient1)',
              })}
            </svg>
          )}
        />,
      );
    } else {
      stars.push(
        <StarIcon
          key={i}
          style={{ color: 'white' }}
          className={classes.icon}
          component={svgProps => (
            <svg {...svgProps}>
              <defs>
                <linearGradient id="gradient2">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>
              </defs>
              {React.cloneElement(svgProps.children[0], {
                fill: 'url(#gradient2)',
              })}
            </svg>
          )}
        />,
      );
    }
  }
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => { props.history.push(`/restaurants/${props.id}`); }}>
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
          {
            stars
          }
          {
            props.rating > 0 ? `${props.rating} / 5` : ''
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withRouter(RestaurantCard);
