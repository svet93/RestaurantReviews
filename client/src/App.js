import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import * as actions from './actions';

// import routes
import PrivateRoute from './private-route';

import Signin from './components/signin';
import Signup from './components/signup';
import ResetPassword from './components/forgot_pass';
import Restaurants from './components/restaurants';
import Restaurant from './components/restaurant_detail';
import Account from './components/account';
import Users from './components/users';

const buildRoutes = () => {
  const routes = [
    {
      path: '/',
      exact: true,
      main: () => <Restaurants isOwner={false} />,
    },
    {
      path: '/restaurants/:id',
      exact: true,
      main: () => <Restaurant isOwner={false} />,
    },
    {
      path: '/myRestaurants',
      exact: true,
      main: () => <Restaurants isOwner />,
    },
    {
      path: '/myRestaurants/:id',
      exact: true,
      main: () => <Restaurant isOwner />,
    },
    {
      path: '/account',
      main: () => <Account />,
    },
    {
      path: '/users',
      main: () => <Users />,
    },
  ].map((route, i) => ({ ...route, key: i }));

  return routes;
};

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    const {
      isAuthenticated,
    } = this.props;

    return (
      <Router>
        <div>
          <Switch>
            <Route
              path="/signin/:socialToken?"
              exact
              component={() => <Signin />}
            />

            <Route
              path="/signup"
              exact
              component={() => <Signup />}
            />

            <Route
              path="/resetPassword"
              exact
              component={() => <ResetPassword />}
            />


            {buildRoutes().map(route => ( // buildRoutes needs to be called on render
              <PrivateRoute
                key={route.key}
                path={route.path}
                exact={route.exact}
                component={route.main}
                render={route.render}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: (state.auth ? state.auth.isAuthenticated : false),
});

export default connect(mapStateToProps, actions)(App);
