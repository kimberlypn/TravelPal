defmodule Travelpal.BookedTrips do
  @moduledoc """
  The BookedTrips context.
  """

  import Ecto.Query, warn: false
  alias Travelpal.Repo

  alias Travelpal.BookedTrips.BookedTrip

  @doc """
  Returns the list of bookedtrips.

  ## Examples

      iex> list_bookedtrips()
      [%BookedTrip{}, ...]

  """
  def list_bookedtrips do
    Repo.all(from b in BookedTrip,
      order_by: [asc: :start_date])
    |> Repo.preload(:user)
    |> Repo.preload(:flight)
    |> Repo.preload(:hotel)
  end

  @doc """
  Gets a single booked_trip.

  Raises `Ecto.NoResultsError` if the Booked trip does not exist.

  ## Examples

      iex> get_booked_trip!(123)
      %BookedTrip{}

      iex> get_booked_trip!(456)
      ** (Ecto.NoResultsError)

  """
  def get_booked_trip!(id), do: Repo.get!(BookedTrip, id)

  @doc """
  Creates a booked_trip.

  ## Examples

      iex> create_booked_trip(%{field: value})
      {:ok, %BookedTrip{}}

      iex> create_booked_trip(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_booked_trip(attrs \\ %{}) do
    {:ok, booked_trip} = %BookedTrip{}
    |> BookedTrip.changeset(attrs)
    |> Repo.insert()

    booked_trip = booked_trip
    |> Repo.preload(:user)
    |> Repo.preload(:flight)
    |> Repo.preload(:hotel)
    {:ok, booked_trip}
  end

  @doc """
  Updates a booked_trip.

  ## Examples

      iex> update_booked_trip(booked_trip, %{field: new_value})
      {:ok, %BookedTrip{}}

      iex> update_booked_trip(booked_trip, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_booked_trip(%BookedTrip{} = booked_trip, attrs) do
    booked_trip
    |> BookedTrip.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a BookedTrip.

  ## Examples

      iex> delete_booked_trip(booked_trip)
      {:ok, %BookedTrip{}}

      iex> delete_booked_trip(booked_trip)
      {:error, %Ecto.Changeset{}}

  """
  def delete_booked_trip(%BookedTrip{} = booked_trip) do
    Repo.delete(booked_trip)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking booked_trip changes.

  ## Examples

      iex> change_booked_trip(booked_trip)
      %Ecto.Changeset{source: %BookedTrip{}}

  """
  def change_booked_trip(%BookedTrip{} = booked_trip) do
    BookedTrip.changeset(booked_trip, %{})
  end
end
