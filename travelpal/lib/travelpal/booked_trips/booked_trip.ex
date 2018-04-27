defmodule Travelpal.BookedTrips.BookedTrip do
  use Ecto.Schema
  import Ecto.Changeset

  alias Travelpal.Users.User
  alias Travelpal.ExternalAPI.Flight
  alias Travelpal.Accommodation.Hotel

  schema "bookedtrips" do
    field :origin, :string
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
    |> cast(attrs, [:origin, :destination, :start_date, :end_date,
      :departure_time, :arrival_time, :passengers, :cost, :rooms, :summary,
      :user_id, :flight_id, :hotel_id])
    |> validate_required([:origin, :destination, :start_date, :end_date,
      :departure_time, :arrival_time, :passengers, :cost, :user_id, :flight_id])
    |> validate_dates_start_end()
    |> validate_times_arrival_departure()
    |> validate_number(:passengers, greater_than: 0)
    |> validate_number(:cost, greater_than: -1)
    |> validate_number(:rooms, greater_than: -1)
    |> validate_length(:summary, max: 150)
  end

  defp validate_dates_start_end(changeset) do
    start_date = get_field(changeset, :start_date)
    end_date = get_field(changeset, :end_date)

    compared = Date.compare(start_date, end_date)

    valid_dates?(changeset, compared)
  end

  defp validate_times_arrival_departure(changeset) do
    arrival_time = get_field(changeset, :arrival_time)
    departure_time = get_field(changeset, :departure_time)
    compared_times = Time.compare(arrival_time, departure_time)
    start_date = get_field(changeset, :start_date)
    end_date = get_field(changeset, :end_date)
    compared_dates = Date.compare(start_date, end_date)

    valid_times?(changeset, compared_times, compared_dates)
  end

  defp valid_dates?(changeset, compared) when compared == :eq or compared == :lt, do: changeset
  defp valid_dates?(changeset, _), do: {:error, "Invalid dates."}

  defp valid_times?(changeset, compared_times, compared_dates) when compared_dates == :lt or
                                                                    (compared_dates == :eq and
                                                                    compared_times == :lt), do: changeset
  defp valid_times?(changeset, _, _), do: {:error, "Invalid times."}
end
