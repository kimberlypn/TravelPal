defmodule Travelpal.Hotels.Hotel do
  use Ecto.Schema
  import Ecto.Changeset


  schema "hotels" do
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(hotel, attrs) do
    hotel
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
