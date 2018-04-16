defmodule TravelpalWeb.TravelDateView do
  use TravelpalWeb, :view
  alias TravelpalWeb.TravelDateView
  alias TravelpalWeb.UserView

  def render("index.json", %{traveldates: traveldates}) do
    travels = Enum.map(traveldates, fn travel ->
      %{
        id: Map.get(travel, :id),
        start_date: Map.get(travel, :start_date),
        end_date: Map.get(travel, :end_date),
        destination: Map.get(travel, :destination),
        price_limit: Map.get(travel, :price_limit),
        passengers: Map.get(travel, :passengers),
        user: render_one(Map.get(travel, :user), UserView, "user.json")
      }
    end)
    %{data: travels}
  end

  def render("show.json", %{travel_date: travel_date}) do
    %{data: render_one(travel_date, TravelDateView, "travel_date.json")}
  end

  def render("travel_date.json", %{travel_date: travel_date}) do
    %{id: travel_date.id,
      start_date: travel_date.start_date,
      end_date: travel_date.end_date,
      destination: travel_date.destination,
      price_limit: travel_date.price_limit,
      passengers: travel_date.passengers,
      user: render_one(travel_date.user, UserView, "user.json")
    }
  end
end
