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

function friends(state = [], action) {
  switch (action.type) {
    case 'FRIENDS_LIST':
      return [...action.friends];
    default:
      return state;
  }
}

function travelDates(state = [], action) {
  switch (action.type) {
    case 'TRAVEL_DATES_LIST':
      return [...action.travelDates];
    default:
      return state;
  }
}

function bookedTrips(state = [], action) {
  switch (action.type) {
    case 'BOOKED_TRIPS_LIST':
      return [...action.bookedTrips];
    default:
      return state;
  }
}

function flights(state = [], action) {
  switch (action.type) {
    case 'FLIGHTS_LIST':
      return [...action.flights];
    default:
      return state;
  }
}

function hotels(state = [], action) {
  switch (action.type) {
    case 'HOTELS_LIST':
      return [...action.hotels];
    default:
      return state;
  }
}

function tripSummaries(state = [], action) {
  switch (action.type) {
    case 'TRIP_SUMMARIES_LIST':
      return [...action.tripSummaries];
    default:
      return state;
  }
}

let empty_form = {
  token: "",
  id: "",
  email: "",
  name: "",
  username: "",
  budget: 0
}

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'SET_TOKEN':
      let session = {
        token: action.token.token,
        id: action.token.id,
        email: action.token.email,
        name: action.token.name,
        username: action.token.username,
        budget: action.token.budget
      }
      return Object.assign({}, state, session);
    case 'DESTROY_TOKEN':
      return empty_form;
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      localStorage.setItem('token', action.token.token)
      localStorage.setItem('id', action.token.id)
      localStorage.setItem('email', action.token.email)
      localStorage.setItem('name', action.token.name)
      localStorage.setItem('username', action.token.username)
      localStorage.setItem('budget', action.token.budget)
      console.log(localStorage.getItem('username'))
      return action.token;
    case 'DESTROY_TOKEN':
      localStorage.clear();
      return null;
    default:
      return state;
  }
}

let empty_login = {
  username: "",
  password: ""
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
  name: "",
  username: "",
  password: "",
  budget: 0
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

let empty_booked = {
  id: "",
  destination: "",
  start_date: "",
  end_date: "",
  departure_time: "",
  arrival_time: "",
  passengers: 1,
  cost: 0,
  rooms: 0,
  flight_id: "",
  hotel_id: ""
}

function booked(state = empty_booked, action) {
  switch (action.type) {
    case 'UPDATE_BOOKED_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_BOOKED_FORM':
      return empty_booked;
    default:
      return state;
  }
}

let empty_trip_summary = {
  bookedtrip_id: "",
  summary: ""
}

function summary(state = empty_trip_summary, action) {
  switch (action.type) {
    case 'UPDATED_SUMMARY_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_SUMMARY_FORM':
      return empty_trip_summary;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {tasks, users, form} is ES6 shorthand for
  // {tasks: tasks, users: users, form: form}
  let reducer = combineReducers({
    users, friends, travelDates, bookedTrips, flights, hotels, tripSummaries,
    form, token, login, register, booked, summary
  });
  let state1 = reducer(state0, action);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
