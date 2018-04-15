defmodule Travelpal.Repo.Migrations.CreateWeathers do
  use Ecto.Migration

  def change do
    create table(:weathers) do
      add :city, :string
      add :date, :date
      add :high, :integer
      add :low, :integer
      add :text, :string
      add :forecast, {:array, :map}

      timestamps()
    end

  end
end
