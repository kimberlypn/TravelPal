defmodule Travelpal.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :email, :string, null: false
      add :username, :string, null: false
      add :budget, :integer, default: 0, null: false

      timestamps()
    end

    # Make sure that the username is unique since it is used for logging in;
    # emails must also be unique
    create unique_index(:users, [:username, :email])
  end
end
