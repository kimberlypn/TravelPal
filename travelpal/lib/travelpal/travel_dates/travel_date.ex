defmodule Travelpal.TravelDates.TravelDate do
  use Ecto.Schema
  import Ecto.Changeset

  alias Travelpal.Users.User

  schema "traveldates" do
    field :destination, :string
    field :end_date, :date
    field :price_limit, :integer
    field :start_date, :date

    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(travel_date, attrs) do
    travel_date
    |> cast(attrs, [:start_date, :end_date, :destination, :price_limit, :booked,
      :user_id])
    |> validate_required([:start_date, :end_date, :destination, :price_limit,
      :booked, :user_id])
  end
end
