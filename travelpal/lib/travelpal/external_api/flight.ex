defmodule Travelpal.ExternalAPI.Flight do
  use Ecto.Schema
  import Ecto.Changeset

  schema "flights" do
    field :origin, :string
    field :dest, :string
    field :date_from, :date
    field :date_to, :date
    field :price, :float
    field :airlines, {:array, :string}
    field :duration, :map
    field :arrival_time, :string
    field :departure_time, :string

    timestamps()
  end

  @doc false
  def changeset(flight, attrs) do
    flight
    |> cast(attrs, [:origin, :dest, :date_from, :date_to, :price,
      :airlines, :duration, :arrival_time, :departure_time])
    |> validate_required([:origin, :dest, :date_from, :date_to, :price,
      :airlines, :duration, :arrival_time, :departure_time])
    |> validate_locations()
    |> validate_dates_from_to()
  end

  defp validate_locations(changeset) do
    origin = get_field(changeset, :origin)
    dest = get_field(changeset, :dest)

    valid_locations?(changeset, origin, dest)
  end

  defp valid_locations?(changeset, origin, dest) when origin != dest, do: changeset
  defp valid_locations?(changeset, _, _), do: {:error, "Invalid locations."}

  defp validate_dates_from_to(changeset) do
    date_from = get_field(changeset, :date_from)
    date_to = get_field(changeset, :date_to)
    compared = Date.compare(date_from, date_to)

    valid_dates?(changeset, compared)
  end

  defp valid_dates?(changeset, compared) when compared == :eq or compared == :lt, do: changeset
  defp valid_dates?(changeset, _), do: {:error, "Invalid dates."}
end
