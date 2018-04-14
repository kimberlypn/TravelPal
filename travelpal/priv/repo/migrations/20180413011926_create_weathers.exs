defmodule Travelpal.Repo.Migrations.CreateWeathers do
  use Ecto.Migration

  def change do
    create table(:weathers) do
      add :city, :string
      add :date, :date
      add :high_temp, :integer
      add :low_temp, :integer
      add :forecast, {:array, :map}

      timestamps()
    end

  end
end
