defmodule TravelpalWeb.TripSummaryView do
  use TravelpalWeb, :view
  alias TravelpalWeb.TripSummaryView
  alias TravelpalWeb.BookedTripView

  def render("index.json", %{tripsummaries: tripsummaries}) do
    summaries = Enum.map(tripsummaries, fn summary ->
      %{
        id: Map.get(summary, :id),
        summary: Map.get(summary, :summary),
        bookedtrip: render_one(Map.get(summary, :bookedtrip), BookedTripView,
          "booked_trip.json")
      }
    end)
    %{data: summaries}
  end

  def render("show.json", %{trip_summary: trip_summary}) do
    %{data: render_one(trip_summary, TripSummaryView, "trip_summary.json")}
  end

  def render("trip_summary.json", %{trip_summary: trip_summary}) do
    %{
      id: trip_summary.id,
      summary: trip_summary.summary,
      bookedtrip: render_one(trip_summary.bookedtrip, BookedTripView,
        "booked_trip.json")
    }
  end
end
