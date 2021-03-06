import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import Icon from '../icons';
import axios from '../utils/axios';
import { API_URL } from '../constants';
import * as actions from '../actions';

const cookies = new Cookies();

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
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  social: {
    margin: theme.spacing(2, 0, 0),
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const setVariables = (user, token) => {
    localStorage.setItem('role', user.role);
    cookies.remove('token', { path: '/' });
    cookies.set('token', token, {
      path: '/',
      expires: new Date(Date.now() + 14400000),
    });

    props.fetchAuthenticated(token);
  };

  const handleLoginLocal = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { user, token } = res.data;
      setVariables(user, token);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setErrorMsg('Invalid credentials');
      }
    }
  };

  useEffect(() => {
    const { socialToken } = props.match.params;
    const autoLogin = () => {
      try {
        axios.post(`${API_URL}/account/refreshToken`, null, {
          headers: {
            Authorization: socialToken ? `Bearer ${socialToken}` : '',
          },
        }).then((res) => {
          const { user, token } = res.data;
          setVariables(user, token);
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (socialToken) {
      autoLogin();
    }
  }, []);

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box>
          <Link href={`${API_URL}/auth/google`}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                color: '#000',
              }}
              className={classes.social}
            >
              <Icon icon="google" />
              Log in with Google
            </Button>
          </Link>
          <Link href={`${API_URL}/auth/facebook`}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                borderRadius: 10,
                backgroundColor: '#385499',
                color: '#fff',
              }}
              className={classes.social}
            >
              <Icon icon="facebook" />
                Log in with Facebook
            </Button>
          </Link>
        </Box>
        <form
          className={classes.form}
          onSubmit={handleLoginLocal}
        >
          <TextField
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {errorMsg
            && (
            <Typography>{errorMsg}</Typography>
            )
          }
          <Grid container>
            <Grid item xs>
              <Link href="/resetPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: (state.auth ? state.auth.isAuthenticated : false),
});

export default withRouter(connect(mapStateToProps, actions)(SignIn));
