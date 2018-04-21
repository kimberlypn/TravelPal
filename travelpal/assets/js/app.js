// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
import store from './store';
import api from './api';
import travelpal_init from "./components/TravelPal";

$(function () {
  api.request_users().then(
    () => api.request_friends().then(
      () => api.request_travel_dates().then(
        () => api.request_booked_trips().then(
          // TODO: Fix API call to work with new Flights schema
          () => api.request_flights().then(
              travelpal_init(store)
         )
        )
      )
    )
  );
});
