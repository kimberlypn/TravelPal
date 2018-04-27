defmodule Travelpal.TravelDates.TravelDate do
  use Ecto.Schema
  import Ecto.Changeset

  alias Travelpal.Users.User

  schema "traveldates" do
    field :origin, :string
    field :destination, :string
    field :end_date, :date
    field :price_limit, :integer
    field :start_date, :date
    field :passengers, :integer

    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(travel_date, attrs) do
    travel_date
    |> cast(attrs, [:start_date, :end_date, :origin, :destination, :price_limit,
      :passengers, :user_id])
    |> validate_required([:start_date, :end_date, :origin, :destination,
      :price_limit, :passengers, :user_id])
    |> validate_dates_start_end()
    |> validate_number(:price_limit, greater_than: -1)
    |> validate_number(:passengers, greater_than: 0)
    |> validate_start_date()
  end

  defp validate_dates_start_end(changeset) do
    start_date = get_field(changeset, :start_date)
    end_date = get_field(changeset, :end_date)
    compared = Date.compare(start_date, end_date)

    valid_dates?(changeset, compared)
  end

  defp validate_start_date(changeset) do
    start_date = get_field(changeset, :start_date)
    compared = Date.compare(Date.utc_today(), start_date)

    valid_dates?(changeset, compared)
  end

  defp valid_dates?(changeset, compared) when compared == :eq or compared == :lt, do: changeset
  defp valid_dates?(changeset, _), do: {:error, "Invalid dates."}
end
