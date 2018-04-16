defmodule Travelpal.Repo.Migrations.CreateTripsummaries do
  use Ecto.Migration

  def change do
    create table(:tripsummaries) do
      add :summary, :text
      add :bookedtrip_id, references(:bookedtrips, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:tripsummaries, [:bookedtrip_id])
  end
end
