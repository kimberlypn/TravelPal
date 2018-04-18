defmodule Travelpal.Repo.Migrations.CreateBookedtrips do
  use Ecto.Migration

  def change do
    create table(:bookedtrips) do
      add :destination, :string, null: false
      add :start_date, :date, null: false
      add :end_date, :date, null: false
      add :departure_time, :time, null: false
      add :arrival_time, :time, null: false
      add :passengers, :integer, default: 1, null: false
      add :cost, :integer, default: 0, null: false
      add :rooms, :integer, default: 0
      add :summary, :text
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :flight_id, references(:flights, on_delete: :delete_all), null: false
      add :hotel_id, references(:hotels, on_delete: :delete_all)

      timestamps()
    end

    create index(:bookedtrips, [:user_id])
    create index(:bookedtrips, [:flight_id])
    create index(:bookedtrips, [:hotel_id])
  end
end
