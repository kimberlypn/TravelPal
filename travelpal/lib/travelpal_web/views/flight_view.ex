defmodule TravelpalWeb.FlightView do
  use TravelpalWeb, :view
  alias TravelpalWeb.FlightView

  def render("index.json", %{flights: flights}) do
    %{data: render_many(flights, FlightView, "flight.json")}
  end

  def render("show.json", %{flight: flight}) do
    %{data: flight}
  end

  def render("flight.json", %{flight: flight}) do
    %{
      id: flight.id,
      origin: flight.origin,
      dest: flight.dest,
      date_from: flight.date_from,
      date_to: flight.date_to,
      price: flight.price,
      airlines: flight.airlines,
      duration: flight.duration
    }
  end
end
