defmodule Travelpal.BookedTrips.BookedTrip do
  use Ecto.Schema
  import Ecto.Changeset

  alias Travelpal.Users.User
  alias Travelpal.Flights.Flight
  alias Travelpal.Accommodation.Hotel

  schema "bookedtrips" do
    field :destination, :string
    field :start_date, :date
    field :end_date, :date
    field :departure_time, :time
    field :arrival_time, :time
    field :passengers, :integer
    field :cost, :integer
    field :rooms, :integer
    field :summary, :string

    belongs_to :user, User
    belongs_to :flight, Flight
    belongs_to :hotel, Hotel

    timestamps()
  end

  @doc false
  def changeset(booked_trip, attrs) do
    booked_trip
    |> cast(attrs, [:destination, :start_date, :end_date, :departure_time,
      :arrival_time, :passengers, :cost, :rooms, :summary, :user_id, :flight_id,
      :hotel_id])
    |> validate_required([:destination, :start_date, :end_date, :departure_time,
      :arrival_time, :passengers, :cost, :user_id, :flight_id])
  end
end
