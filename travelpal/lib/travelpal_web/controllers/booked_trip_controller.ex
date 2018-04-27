defmodule TravelpalWeb.BookedTripController do
  use TravelpalWeb, :controller

  alias Travelpal.BookedTrips
  alias Travelpal.BookedTrips.BookedTrip

  action_fallback TravelpalWeb.FallbackController

  def index(conn, _params) do
    bookedtrips = BookedTrips.list_bookedtrips()
    render(conn, "index.json", bookedtrips: bookedtrips)
  end

  # Converts a string from "YYYY/MM/DD" to a date object
  defp parse_date(date) do
    date = String.split(date, "-")
    yyyy = Enum.at(date, 0) |> String.to_integer()
    mm = Enum.at(date, 1) |> String.to_integer()
    dd = Enum.at(date, 2) |> String.to_integer()
    %Date{year: yyyy, month: mm, day: dd}
  end

  def create(conn, %{"booked_trip" => booked_trip_params}) do
    booked_trip_params = booked_trip_params
    |> Map.put("start_date",
      parse_date(Map.get(booked_trip_params, "start_date")))
    |> Map.put("end_date",
      parse_date(Map.get(booked_trip_params, "end_date")))

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

  # Converts a string from "HH:MM" to a time object
  def parse_time(time) do
    time = String.split(time, ":")
    hr = Enum.at(time, 0) |> String.to_integer()
    min = Enum.at(time, 1) |> String.to_integer()
    %Time{hour: hr, minute: min, second: 0}
  end

  def update(conn, %{"booked_trip" => booked_trip_params}) do
    booked_trip =
      BookedTrips.get_booked_trip!(Map.get(booked_trip_params, "id"))

    booked_trip_params = booked_trip_params
    |> Map.put("arrival_time",
      parse_time(Map.get(booked_trip_params, "arrival_time")))
    |> Map.put("departure_time",
      parse_time(Map.get(booked_trip_params, "departure_time")))

    with {:ok, %BookedTrip{} = booked_trip} <-
      BookedTrips.update_booked_trip(booked_trip, booked_trip_params) do
      conn
      |> put_status(:ok)
      |> put_resp_header("location", page_path(conn, :index))
      |> render("index.json", bookedtrips: BookedTrips.list_bookedtrips())
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
