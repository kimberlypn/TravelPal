defmodule Travelpal.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :username, :string
      add :name, :string

      timestamps()
    end

  end
end
