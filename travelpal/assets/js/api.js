// Adapted from Nat's lecture notes
import store from './store';

class TheServer {
  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
      error: (resp) => {
        alert("Could not load users.");
      }
    });
  }

  request_friends() {
    $.ajax("/api/v1/friends", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'FRIENDS_LIST',
          friends: resp.data,
        });
      },
      error: (resp) => {
        alert("Could not load friends.");
      }
    });
  }

  request_travel_dates() {
    $.ajax("/api/v1/traveldates", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TRAVEL_DATES_LIST',
          travelDates: resp.data,
        });
      },
      error: (resp) => {
        alert("Could not load travel dates.");
      }
    });
  }

  submit_login(data) {
    console.log(data);
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: (resp) => {
        alert("Could not log in. Please try again.");
      }
    });
  }

  create_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user: data}),
      success: (resp) => {
        alert("Successfully registered! You can now log in.");
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
      },
      error: (resp) => {
        alert("Failed to register. Please try again.");
      },
    });
  }

  edit_user(data) {
    $.ajax("/api/v1/users/" + data.id, {
      method: "patch",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user: data}),
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
      error: (resp) => {
        alert("Could not save the edit. Please try again.");
      }
    });
  }

  delete_friend(data) {
    $.ajax("/api/v1/friends/" + data, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'FRIENDS_LIST',
          friends: resp.data,
        });
      },
      error: (resp) => {
        alert("Could not unfriend. Please try again.");
      }
    });
  }

  delete_travel_date(data) {
    $.ajax("/api/v1/traveldates/" + data, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'TRAVEL_DATES_LIST',
          travelDates: resp.data,
        });
      },
      error: (resp) => {
        alert("Could not cancel trip. Please try again.");
      }
    });
  }

  request_hotels(data) {
    $.ajax("/api/v1/hotels/fetch", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({info:data}),
      success: (resp) => {
        console.log(resp.data)
      },
      error: (resp) => {
        alert("Could not load friends.");
      }
    });
  }
}

export default new TheServer();
