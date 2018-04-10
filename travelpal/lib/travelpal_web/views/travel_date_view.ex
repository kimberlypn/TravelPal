defmodule TravelpalWeb.TravelDateView do
  use TravelpalWeb, :view
  alias TravelpalWeb.TravelDateView

  def render("index.json", %{traveldates: traveldates}) do
    %{data: render_many(traveldates, TravelDateView, "travel_date.json")}
  end

  def render("show.json", %{travel_date: travel_date}) do
    %{data: render_one(travel_date, TravelDateView, "travel_date.json")}
  end

  def render("travel_date.json", %{travel_date: travel_date}) do
    %{id: travel_date.id,
      start_date: travel_date.start_date,
      end_date: travel_date.end_date,
      destination: travel_date.destination,
      price_limit: travel_date.price_limit}
  end
end
