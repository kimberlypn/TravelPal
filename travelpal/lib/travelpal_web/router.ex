defmodule TravelpalWeb.Router do
  use TravelpalWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TravelpalWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/search", PageController, :index
    get "/travel/dates", PageController, :index
    get "/travel/booked", PageController, :index
    get "/travel/past", PageController, :index
    get "/profile", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", TravelpalWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/traveldates", TravelDateController, except: [:new, :edit]
    resources "/friends", FriendController, except: [:new, :edit]
    post "/token", TokenController, :create

    resources "/hotels", HotelController, except: [:new, :edit, :show]
    post "/hotels/fetch", HotelController, :get_hotel_information
    get "/weather/:city", WeatherController, :get_weather_by_city
    get "/travel/flights", FlightController, :get_flights_to_from
  end
end
