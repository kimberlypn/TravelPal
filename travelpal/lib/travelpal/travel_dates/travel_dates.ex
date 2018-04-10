defmodule Travelpal.TravelDates do
  @moduledoc """
  The TravelDates context.
  """

  import Ecto.Query, warn: false
  alias Travelpal.Repo

  alias Travelpal.TravelDates.TravelDate

  @doc """
  Returns the list of traveldates.

  ## Examples

      iex> list_traveldates()
      [%TravelDate{}, ...]

  """
  def list_traveldates do
    Repo.all(TravelDate)
  end

  @doc """
  Gets a single travel_date.

  Raises `Ecto.NoResultsError` if the Travel date does not exist.

  ## Examples

      iex> get_travel_date!(123)
      %TravelDate{}

      iex> get_travel_date!(456)
      ** (Ecto.NoResultsError)

  """
  def get_travel_date!(id), do: Repo.get!(TravelDate, id)

  @doc """
  Creates a travel_date.

  ## Examples

      iex> create_travel_date(%{field: value})
      {:ok, %TravelDate{}}

      iex> create_travel_date(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_travel_date(attrs \\ %{}) do
    %TravelDate{}
    |> TravelDate.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a travel_date.

  ## Examples

      iex> update_travel_date(travel_date, %{field: new_value})
      {:ok, %TravelDate{}}

      iex> update_travel_date(travel_date, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_travel_date(%TravelDate{} = travel_date, attrs) do
    travel_date
    |> TravelDate.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a TravelDate.

  ## Examples

      iex> delete_travel_date(travel_date)
      {:ok, %TravelDate{}}

      iex> delete_travel_date(travel_date)
      {:error, %Ecto.Changeset{}}

  """
  def delete_travel_date(%TravelDate{} = travel_date) do
    Repo.delete(travel_date)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking travel_date changes.

  ## Examples

      iex> change_travel_date(travel_date)
      %Ecto.Changeset{source: %TravelDate{}}

  """
  def change_travel_date(%TravelDate{} = travel_date) do
    TravelDate.changeset(travel_date, %{})
  end
end
