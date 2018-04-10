# Taken from Nat's lecture notes
defmodule TravelpalWeb.TokenController do
  use TravelpalWeb, :controller
  alias Travelpal.Users.User

  action_fallback TravelpalWeb.FallbackController

  def create(conn, %{"username" => username, "password" => password}) do
    with {:ok, %User{} = user} <-
      Travelpal.Users.get_and_auth_user(username, password) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
