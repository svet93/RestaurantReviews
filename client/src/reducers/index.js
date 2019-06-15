import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import { LOGOUT } from '../actions/types';

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state, action) => {
  let nState = { ...state };
  if (action.type === LOGOUT) {
    nState = undefined;
  }

  return appReducer(nState, action);
};

export default rootReducer;
