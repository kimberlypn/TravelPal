// Adapted from Nat's lecture notes
import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  case 'ADD_USER':
    return [action.user, ...state];
  default:
    return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'DESTROY_TOKEN':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  username: "",
  pass: ""
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    case 'DESTROY_TOKEN':
      return empty_login;
    default:
      return state;
  }
}

let empty_register = {
  email: "",
  username: "",
  name: "",
  password: ""
}

function register(state = empty_register, action) {
  switch (action.type) {
    case 'UPDATE_REGISTRATION_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_register;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {tasks, users, form} is ES6 shorthand for
  // {tasks: tasks, users: users, form: form}
  let reducer = combineReducers({users, token, login, register});
  let state1 = reducer(state0, action);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
