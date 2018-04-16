defmodule Travelpal.Repo.Migrations.CreateFlights do
  use Ecto.Migration

  def change do
    create table(:flights) do
      add :airline, :string, null: false

      timestamps()
    end

  end
end
