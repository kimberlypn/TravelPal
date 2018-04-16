defmodule TravelpalWeb.HotelView do
  use TravelpalWeb, :view
  alias TravelpalWeb.HotelView

  def render("index.json", %{hotels: hotels}) do
    %{data: render_many(hotels, HotelView, "hotel.json")}
  end

  def render("show.json", %{hotel: hotel}) do
    %{data: render_one(hotel, HotelView, "hotel.json")}
  end

  def render("hotel.json", %{hotel: hotel}) do
    %{
      id: hotel.id,
      name: hotel.name
    }
  end
end
