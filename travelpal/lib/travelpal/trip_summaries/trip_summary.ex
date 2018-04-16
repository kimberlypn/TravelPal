defmodule Travelpal.TripSummaries.TripSummary do
  use Ecto.Schema
  import Ecto.Changeset

  alias Travelpal.BookedTrips.BookedTrip

  schema "tripsummaries" do
    field :summary, :string

    belongs_to :bookedtrip, BookedTrip

    timestamps()
  end

  @doc false
  def changeset(trip_summary, attrs) do
    trip_summary
    |> cast(attrs, [:summary, :bookedtrip_id])
    |> validate_required([:summary, :bookedtrip_id])
  end
end
