import {combineReducers} from 'redux';
import {AUTH_LOADING, USER_LOGIN, ITEMS, LOGOUT} from './action';

const initialUserState = {
  AuthLoading: false,
  login: '',
  items: '',
};

const userReducer = (state = initialUserState, action) => {
  if (action.type === LOGOUT) {
    return {
      ...state,
      AuthLoading: false,
      login: '',
      items: '',
    };
  }
  if (action.type === AUTH_LOADING) {
    return {
      ...state,
      AuthLoading: action.payload,
    };
  }
  if (action.type === USER_LOGIN) {
    return {
      ...state,
      login: action.payload.login,
    };
  }
  if (action.type === ITEMS) {
    return {
      ...state,
      items: action.payload.items,
    };
  }

  return state;
};

const reducer = combineReducers({
  user: userReducer,
});
export default reducer;
