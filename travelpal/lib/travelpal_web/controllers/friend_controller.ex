defmodule TravelpalWeb.FriendController do
  use TravelpalWeb, :controller

  alias Travelpal.Friends
  alias Travelpal.Friends.Friend

  action_fallback TravelpalWeb.FallbackController

  def index(conn, _params) do
    friends = Friends.list_friends()
    render(conn, "index.json", friends: friends)
  end

  def create(conn, %{"friend" => friend_params}) do
    with {:ok, %Friend{} = friend} <- Friends.create_friend(friend_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", friend_path(conn, :show, friend))
      |> render("show.json", friend: friend)
    end
  end

  def show(conn, %{"id" => id}) do
    friend = Friends.get_friend!(id)
    render(conn, "show.json", friend: friend)
  end

  def update(conn, %{"id" => id, "friend" => friend_params}) do
    friend = Friends.get_friend!(id)

    with {:ok, %Friend{} = friend} <- Friends.update_friend(friend, friend_params) do
      render(conn, "show.json", friend: friend)
    end
  end

  def delete(conn, %{"id" => id}) do
    friend = Friends.get_friend!(id)
    with {:ok, %Friend{}} <- Friends.delete_friend(friend) do
      conn
      |> put_status(:ok)
      |> put_resp_header("location", page_path(conn, :index))
      |> render("index.json", friends: Friends.list_friends())
    end
  end
end
