import * as types from './types';

export const fetchAuthenticated = token => async (dispatch) => {
  dispatch({ type: types.FETCH_AUTH, payload: token });
};

export const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT, payload: true });
};
