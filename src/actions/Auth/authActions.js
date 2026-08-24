export const AUTH_TYPES = {
  SIGN_IN_REQUEST: 'AUTH/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'AUTH/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'AUTH/SIGN_IN_FAILURE',
  SIGN_UP_REQUEST: 'AUTH/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'AUTH/SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'AUTH/SIGN_UP_FAILURE',
  LOGOUT: 'AUTH/LOGOUT',
};

export const signInRequest = (payload = {}) => ({
  type: AUTH_TYPES.SIGN_IN_REQUEST,
  payload,
});

export const signInSuccess = (payload = {}) => ({
  type: AUTH_TYPES.SIGN_IN_SUCCESS,
  payload,
});

export const signInFailure = (error = '') => ({
  type: AUTH_TYPES.SIGN_IN_FAILURE,
  payload: error,
});

export const signUpRequest = (payload = {}) => ({
  type: AUTH_TYPES.SIGN_UP_REQUEST,
  payload,
});

export const signUpSuccess = (payload = {}) => ({
  type: AUTH_TYPES.SIGN_UP_SUCCESS,
  payload,
});

export const signUpFailure = (error = '') => ({
  type: AUTH_TYPES.SIGN_UP_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: AUTH_TYPES.LOGOUT,
});

export default {
  AUTH_TYPES,
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  logout,
};
