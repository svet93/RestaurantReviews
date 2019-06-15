import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// import TopHeader from './components/header/topHeader';


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated === true
        ? (
          <div>
            {/* <TopHeader /> */}
            <Component {...props} {...rest} />
          </div>
        )
        : <Redirect to="/signin" />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
