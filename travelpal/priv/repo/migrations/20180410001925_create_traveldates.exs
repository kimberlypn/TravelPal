defmodule Travelpal.Repo.Migrations.CreateTraveldates do
  use Ecto.Migration

  def change do
    create table(:traveldates) do
      add :start_date, :date, null: false
      add :end_date, :date, null: false
      add :destination, :string
      add :price_limit, :float, default: 0.0
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:traveldates, [:user_id])
  end
end
