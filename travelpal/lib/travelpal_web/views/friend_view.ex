defmodule TravelpalWeb.FriendView do
  use TravelpalWeb, :view
  alias TravelpalWeb.FriendView
  alias TravelpalWeb.UserView

  def render("index.json", %{friends: friends}) do
    friends = Enum.map(friends, fn friend ->
      %{
        id: Map.get(friend, :id),
        status: Map.get(friend, :status),
        requestor: render_one(Map.get(friend, :requestor), UserView, "user.json"),
        acceptor: render_one(Map.get(friend, :acceptor), UserView, "user.json")
      }
    end)
    %{data: friends}
  end

  def render("show.json", %{friend: friend}) do
    %{data: render_one(friend, FriendView, "friend.json")}
  end

  def render("friend.json", %{friend: friend}) do
    %{id: friend.id,
      status: friend.status}
  end
end
