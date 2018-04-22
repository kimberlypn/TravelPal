defmodule Travelpal.Repo.Migrations.CreateTraveldates do
  use Ecto.Migration

  def change do
    create table(:traveldates) do
      add :start_date, :date, null: false
      add :end_date, :date, null: false
      add :origin, :string, null: false
      add :destination, :string, null: false
      add :price_limit, :integer, default: 0, null: false
      add :passengers, :integer, default: 1, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:traveldates, [:user_id])
  end
end
