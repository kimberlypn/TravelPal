defmodule Travelpal.ExternalAPI.Flight do
  use Ecto.Schema
  import Ecto.Changeset

  schema "flights" do
    field :origin, :string
    field :dest, :string
    field :price, :float
    field :duration, :map
    field :link, :string

    timestamps()
  end

  @doc false
  def changeset(flight, attrs) do
    flight
    |> cast(attrs, [:origin, :dest, :price, :duration, :link])
    |> validate_required([:origin, :dest, :price, :duration])
    |> validate_locations()
  end

  defp validate_locations(changeset) do
    origin = get_field(changeset, :origin)
    dest = get_field(changeset, :dest)

    valid_locations?(changeset, origin, dest)
  end

  defp valid_locations?(changeset, origin, dest) when origin != dest, do: changeset
  defp valid_locations?(changeset, _, _), do: {:error, "Invalid locations."}
end
