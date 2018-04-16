defmodule Travelpal.Repo.Migrations.CreateHotels do
  use Ecto.Migration

  def change do
    create table(:hotels) do
      add :name, :string, null: false

      timestamps()
    end

  end
end
