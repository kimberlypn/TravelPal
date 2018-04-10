defmodule TravelpalWeb.FollowController do
  use TravelpalWeb, :controller

  alias Travelpal.Follows
  alias Travelpal.Follows.Follow

  action_fallback TravelpalWeb.FallbackController

  def index(conn, _params) do
    follows = Follows.list_follows()
    render(conn, "index.json", follows: follows)
  end

  def create(conn, %{"follow" => follow_params}) do
    with {:ok, %Follow{} = follow} <- Follows.create_follow(follow_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", follow_path(conn, :show, follow))
      |> render("show.json", follow: follow)
    end
  end

  def show(conn, %{"id" => id}) do
    follow = Follows.get_follow!(id)
    render(conn, "show.json", follow: follow)
  end

  def update(conn, %{"id" => id, "follow" => follow_params}) do
    follow = Follows.get_follow!(id)

    with {:ok, %Follow{} = follow} <- Follows.update_follow(follow, follow_params) do
      render(conn, "show.json", follow: follow)
    end
  end

  def delete(conn, %{"id" => id}) do
    follow = Follows.get_follow!(id)
    with {:ok, %Follow{}} <- Follows.delete_follow(follow) do
      send_resp(conn, :no_content, "")
    end
  end
end
