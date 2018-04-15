defmodule TravelpalWeb.BookedTripController do
  use TravelpalWeb, :controller

  alias Travelpal.BookedTrips
  alias Travelpal.BookedTrips.BookedTrip

  action_fallback TravelpalWeb.FallbackController

  def index(conn, _params) do
    bookedtrips = BookedTrips.list_bookedtrips()
    render(conn, "index.json", bookedtrips: bookedtrips)
  end

  def create(conn, %{"booked_trip" => booked_trip_params}) do
    with {:ok, %BookedTrip{} = booked_trip} <-
      BookedTrips.create_booked_trip(booked_trip_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", booked_trip_path(conn, :show, booked_trip))
      |> render("show.json", booked_trip: booked_trip)
    end
  end

  def show(conn, %{"id" => id}) do
    booked_trip = BookedTrips.get_booked_trip!(id)
    render(conn, "show.json", booked_trip: booked_trip)
  end

  def update(conn, %{"id" => id, "booked_trip" => booked_trip_params}) do
    booked_trip = BookedTrips.get_booked_trip!(id)

    with {:ok, %BookedTrip{} = booked_trip} <-
      BookedTrips.update_booked_trip(booked_trip, booked_trip_params) do
      render(conn, "show.json", booked_trip: booked_trip)
    end
  end

  def delete(conn, %{"id" => id}) do
    booked_trip = BookedTrips.get_booked_trip!(id)
    with {:ok, %BookedTrip{}} <- BookedTrips.delete_booked_trip(booked_trip) do
      conn
      |> put_status(:ok)
      |> put_resp_header("location", page_path(conn, :index))
      |> render("index.json", bookedtrips: BookedTrips.list_bookedtrips())
    end
  end
end
