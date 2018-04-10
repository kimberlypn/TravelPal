defmodule Travelpal.Repo.Migrations.CreateFriends do
  use Ecto.Migration

  def change do
    create table(:friends) do
      add :status, :string, default: "Pending", null: false
      add :requestor_id, references(:users, on_delete: :delete_all), null: false
      add :acceptor_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:friends, [:requestor_id])
    create index(:friends, [:acceptor_id])
  end
end
