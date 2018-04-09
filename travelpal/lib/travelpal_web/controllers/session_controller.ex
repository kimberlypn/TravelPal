defmodule TravelpalWeb.SessionController do
  use TravelpalWeb, :controller

  alias Travelpal.Accounts
  alias Travelpal.Accounts.User

  def create(conn, %{"username" => username}) do
    user = Accounts.get_user_by_username(username)

    if user do
      conn
      |> put_session(:user_id, user.id)
      |> put_flash(:info, "Welcome back, #{user.username}! 🙌")
      |> redirect(to: page_path(conn, :index))
    else
      conn
      |> put_flash(:error, "Error with creating session.")
      |> redirect(to: page_path(conn, :index))
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "Logged out. 👋")
    |> redirect(to: page_path(conn, :index))
  end
end
