import {Alert} from 'react-native';
import * as RootNavigation from '../AuthNavigator/NavigationService';
export const AUTH_LOADING = 'AUTH_LOADING';
export const USER_LOGIN = 'USER_LOGIN';
export const LOGOUT = 'LOGOUT';
export const ITEMS = 'ITEMS';

const baseUrl = 'http://3.232.244.22/api/',
  login = 'login',
  getItems = 'items',
  createItem = 'item',
  refreshToken = 'refresh-token/',
  register = 'register';

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT,
    });
  };
};
export const userLogin = (email, password) => {
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(json);
        if (json.success) {
          dispatch({
            type: USER_LOGIN,
            payload: {
              login: json?.user?.token,
            },
          });
        } else {
          Alert.alert('', json?.error[0]);
        }
      })
      .catch(error => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(error);
      });
  };
};
export const userSignUp = (email, password, password_confirmation) => {
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('password_confirmation', password_confirmation);
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + register, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(json);
        if (json.success) {
          Alert.alert('Sign Up Successful', json?.message);
          RootNavigation.navigate('Login');
        } else {
          Alert.alert('', json?.error[0]);
        }
      })
      .catch(error => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(error);
      });
  };
};
export const refreshMyToken = token => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + refreshToken + token, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(json);
        dispatch({
          type: USER_LOGIN,
          payload: {
            login: json?.access_token,
          },
        });
      })
      .catch(error => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(error);
      });
  };
};
export const getUserItemsList = async (token, current_page) => {
  let api;
  try {
    api = await fetch(baseUrl + getItems + `?page=${current_page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('my page', current_page);
        if (json.success) {
          return json;
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const createUserItem = (token, title, description) => {
  const data = new FormData();
  data.append('title', title);
  data.append('description', description);
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + createItem, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
      body: data,
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(json);
        if (json.success) {
          Alert.alert('', 'item created successfully');
          RootNavigation.navigate('ToDoList');
        }
      })
      .catch(error => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(error);
      });
  };
};
export const delteUserItem = async (itemId, token) => {
  let api;
  try {
    api = await fetch(baseUrl + createItem + `/${itemId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('my delete response', json);
        if (json.success) {
          return json;
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const getUserSingleItem = async (itemId, token) => {
  let api;
  try {
    api = await fetch(baseUrl + createItem + `/${itemId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('my update response', json);
        if (json.success) {
          RootNavigation.navigate('UpdateList', {
            title: json.item.title,
            description: json.item.description,
            itemId: json.item.id,
          });
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const UpdateUserItem = async (token, description, itemId) => {
  let api;
  try {
    api = await fetch(baseUrl + createItem + `/${itemId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        description: description,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log('my update response', json);
        if (json.success) {
          return json;
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
