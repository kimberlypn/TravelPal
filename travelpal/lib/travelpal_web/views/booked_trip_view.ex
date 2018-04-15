defmodule TravelpalWeb.BookedTripView do
  use TravelpalWeb, :view
  alias TravelpalWeb.BookedTripView
  alias TravelpalWeb.UserView
  alias TravelpalWeb.FlightView
  alias TravelpalWeb.HotelView

  def render("index.json", %{bookedtrips: bookedtrips}) do
    trips = Enum.map(bookedtrips, fn trip ->
      %{
        id: Map.get(trip, :id),
        destination: Map.get(trip, :destination),
        start_date: Map.get(trip, :start_date),
        end_date: Map.get(trip, :end_date),
        passengers: Map.get(trip, :passengers),
        cost: Map.get(trip, :cost),
        user: render_one(Map.get(trip, :user), UserView, "user.json"),
        flight: render_one(Map.get(trip, :flight), FlightView, "flight.json"),
        hotel: render_one(Map.get(trip, :hotel), HotelView, "hotel.json")
      }
    end)
    %{data: trips}
  end

  def render("show.json", %{booked_trip: booked_trip}) do
    %{data: render_one(booked_trip, BookedTripView, "booked_trip.json")}
  end

  def render("booked_trip.json", %{booked_trip: booked_trip}) do
    %{
      id: booked_trip.id,
      destination: booked_trip.destination,
      start_date: booked_trip.start_date,
      end_date: booked_trip.end_date,
      passengers: booked_trip.passengers,
      cost: booked_trip.cost,
      user: render_one(booked_trip.user, UserView, "user.json"),
      flight: render_one(booked_trip.flight, FlightView, "flight.json"),
      hotel: render_one(booked_trip.hotel, HotelView, "hotel.json")
    }
  end
end
