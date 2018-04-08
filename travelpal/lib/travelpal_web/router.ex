defmodule TravelpalWeb.Router do
  use TravelpalWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :get_current_user
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  def get_current_user(conn, _params) do
    user_id = get_session(conn, :user_id)
    user = Travelpal.Accounts.get_user(user_id || -1)

    assign(conn, :current_user, user)
  end

  scope "/", TravelpalWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    post "/session", SessionController, :create
    delete "/session", SessionController, :delete
  end

  scope "/api/v1", TravelpalWeb do
    pipe_through :api
    resources "/users", UserController
  end

  # Other scopes may use custom stacks.
  # scope "/api", TravelpalWeb do
  #   pipe_through :api
  # end
end
