defmodule Travelpal.Flights.Flight do
  use Ecto.Schema
  import Ecto.Changeset


  schema "flights" do
    field :airline, :string

    timestamps()
  end

  @doc false
  def changeset(flight, attrs) do
    flight
    |> cast(attrs, [:airline])
    |> validate_required([:airline])
  end
end
