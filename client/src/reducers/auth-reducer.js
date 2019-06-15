import { FETCH_AUTH, LOGOUT } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_AUTH:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
