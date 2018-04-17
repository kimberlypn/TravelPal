defmodule Travelpal.ExternalAPI.Weather do
  use Ecto.Schema
  import Ecto.Changeset


  schema "weathers" do
    field :city, :string
    field :date, :date
    field :high, :integer
    field :low, :integer
    field :text, :string
    field :forecast, {:array, :map}

    timestamps()
  end

  @doc false
  def changeset(weather, attrs) do
    weather
    |> cast(attrs, [:city, :date, :high, :low, :text, :forecast])
    |> validate_required([:city, :date, :high, :low])
    |> validate_temps()
  end

  defp validate_temps(changeset) do
    high = get_field(changeset, :high)
    low = get_field(changeset, :low)

    valid_temps?(changeset, high, low)
  end

  defp valid_temps?(changeset, high, low) when high >= low, do: changeset
  defp validate_temps?(changeset, _, _), do: {:error, "Invalid temps."}
end
