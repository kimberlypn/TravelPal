defmodule Travelpal.Accommodation.Hotel do
  use Ecto.Schema
  import Ecto.Changeset


  schema "hotels" do
    field :district, :string
    field :link, :string
    field :name, :string
    field :price, :float
    field :rating, :float

    timestamps()
  end

  @doc false
  def changeset(hotel, attrs) do
    hotel
    |> cast(attrs, [:name, :district, :price, :link, :rating])
    |> validate_required([:name, :district, :price, :link, :rating])
  end
end
