defmodule Travelpal.TripSummaries do
  @moduledoc """
  The TripSummaries context.
  """

  import Ecto.Query, warn: false
  alias Travelpal.Repo

  alias Travelpal.TripSummaries.TripSummary

  @doc """
  Returns the list of tripsummaries.

  ## Examples

      iex> list_tripsummaries()
      [%TripSummary{}, ...]

  """
  def list_tripsummaries do
    Repo.all(TripSummary)
    |> Repo.preload(:bookedtrip)
  end

  @doc """
  Gets a single trip_summary.

  Raises `Ecto.NoResultsError` if the Trip summary does not exist.

  ## Examples

      iex> get_trip_summary!(123)
      %TripSummary{}

      iex> get_trip_summary!(456)
      ** (Ecto.NoResultsError)

  """
  def get_trip_summary!(id), do: Repo.get!(TripSummary, id)

  @doc """
  Creates a trip_summary.

  ## Examples

      iex> create_trip_summary(%{field: value})
      {:ok, %TripSummary{}}

      iex> create_trip_summary(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_trip_summary(attrs \\ %{}) do
    %TripSummary{}
    |> TripSummary.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a trip_summary.

  ## Examples

      iex> update_trip_summary(trip_summary, %{field: new_value})
      {:ok, %TripSummary{}}

      iex> update_trip_summary(trip_summary, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_trip_summary(%TripSummary{} = trip_summary, attrs) do
    trip_summary
    |> TripSummary.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a TripSummary.

  ## Examples

      iex> delete_trip_summary(trip_summary)
      {:ok, %TripSummary{}}

      iex> delete_trip_summary(trip_summary)
      {:error, %Ecto.Changeset{}}

  """
  def delete_trip_summary(%TripSummary{} = trip_summary) do
    Repo.delete(trip_summary)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking trip_summary changes.

  ## Examples

      iex> change_trip_summary(trip_summary)
      %Ecto.Changeset{source: %TripSummary{}}

  """
  def change_trip_summary(%TripSummary{} = trip_summary) do
    TripSummary.changeset(trip_summary, %{})
  end
end
