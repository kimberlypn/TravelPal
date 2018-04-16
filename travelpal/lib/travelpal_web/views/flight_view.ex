defmodule TravelpalWeb.FlightView do
  use TravelpalWeb, :view
  alias TravelpalWeb.FlightView

  def render("index.json", %{flights: flights}) do
    %{data: render_many(flights, FlightView, "flight.json")}
  end

  def render("show.json", %{flight: flight}) do
    %{data: render_one(flight, FlightView, "flight.json")}
  end

  def render("flight.json", %{flight: flight}) do
    %{
      flight: flight
    }
  end
end
