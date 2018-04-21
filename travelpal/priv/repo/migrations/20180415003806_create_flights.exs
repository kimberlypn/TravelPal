defmodule Travelpal.Repo.Migrations.CreateFlights do
  use Ecto.Migration

  def change do
    create table(:flights) do
      add :origin, :string
      add :dest, :string
      add :date_from, :date
      add :date_to, :date
      add :price, :float
      add :airlines, {:array, :string}
      add :duration, :map

      timestamps()
    end

  end
end
