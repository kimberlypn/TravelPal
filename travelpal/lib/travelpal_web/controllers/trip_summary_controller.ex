defmodule TravelpalWeb.TripSummaryController do
  use TravelpalWeb, :controller

  alias Travelpal.TripSummaries
  alias Travelpal.TripSummaries.TripSummary

  action_fallback TravelpalWeb.FallbackController

  def index(conn, _params) do
    tripsummaries = TripSummaries.list_tripsummaries()
    render(conn, "index.json", tripsummaries: tripsummaries)
  end

  def create(conn, %{"trip_summary" => trip_summary_params}) do
    with {:ok, %TripSummary{} = trip_summary} <-
      TripSummaries.create_trip_summary(trip_summary_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", trip_summary_path(conn, :show, trip_summary))
      |> render("show.json", trip_summary: trip_summary)
    end
  end

  def show(conn, %{"id" => id}) do
    trip_summary = TripSummaries.get_trip_summary!(id)
    render(conn, "show.json", trip_summary: trip_summary)
  end

  def update(conn, %{"trip_summary" => trip_summary_params}) do
    trip_summary =
      TripSummaries.get_trip_summary!(Map.get(trip_summary_params, "id"))

    with {:ok, %TripSummary{} = trip_summary} <-
      TripSummaries.update_trip_summary(trip_summary, trip_summary_params) do
      conn
      |> put_status(:ok)
      |> put_resp_header("location", page_path(conn, :index))
      |> render("index.json", tripsummaries: TripSummaries.list_tripsummaries())
    end
  end

  def delete(conn, %{"id" => id}) do
    trip_summary = TripSummaries.get_trip_summary!(id)
    with {:ok, %TripSummary{}} <-
      TripSummaries.delete_trip_summary(trip_summary) do
      conn
      |> put_status(:ok)
      |> put_resp_header("location", page_path(conn, :index))
      |> render("index.json", tripsummaries: TripSummaries.list_tripsummaries())
    end
  end
end
