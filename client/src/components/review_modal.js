import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Rating from 'material-ui-rating';


const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    // width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    margin: 'auto',
    top: `${30}%`,
    left: `${30}%`,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const SimpleModal = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <div className={classes.paper}>
          <Rating
            value={props.stars}
            max={5}
            onChange={value => props.handleRatingChange(value)}
          />
          <TextField
            id="standard-multiline-flexible"
            label="Comment"
            multiline
            rows="2"
            rowsMax="4"
            value={props.comment}
            onChange={props.handleChange('newComment')}
            className={classes.textField}
            margin="normal"
            inputProps={{ maxLength: 250 }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={props.handleSubmit}
          >
            Add
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SimpleModal;
