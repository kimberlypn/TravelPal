defmodule Travelpal.ExternalAPI do
  @moduledoc """
  The ExternalAPI context.
  """

  import Ecto.Query, warn: false
  alias Travelpal.Repo

  alias Travelpal.ExternalAPI.Weather
  alias Travelpal.ExternalAPI.Flight

  @doc """
  Returns the list of weathers.
  ## Examples
      iex> list_weathers()
      [%Weather{}, ...]
  """
  def list_weathers do
    Repo.all(Weather)
  end

  @doc """
  Gets a single weather.
  Raises `Ecto.NoResultsError` if the Weather does not exist.
  ## Examples
      iex> get_weather!(123)
      %Weather{}
      iex> get_weather!(456)
      ** (Ecto.NoResultsError)
  """
  def get_weather!(id), do: Repo.get!(Weather, id)

  @doc """
  Creates a weather.
  ## Examples
      iex> create_weather(%{field: value})
      {:ok, %Weather{}}
      iex> create_weather(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def create_weather(attrs \\ %{}) do
    %Weather{}
    |> Weather.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a weather.
  ## Examples
      iex> update_weather(weather, %{field: new_value})
      {:ok, %Weather{}}
      iex> update_weather(weather, %{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def update_weather(%Weather{} = weather, attrs) do
    weather
    |> Weather.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Weather.
  ## Examples
      iex> delete_weather(weather)
      {:ok, %Weather{}}
      iex> delete_weather(weather)
      {:error, %Ecto.Changeset{}}
  """
  def delete_weather(%Weather{} = weather) do
    Repo.delete(weather)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking weather changes.
  ## Examples
      iex> change_weather(weather)
      %Ecto.Changeset{source: %Weather{}}
  """
  def change_weather(%Weather{} = weather) do
    Weather.changeset(weather, %{})
  end

  def get_weather_by_city(city) do
    Repo.get_by(Weather, city: city)
  end

  alias Travelpal.ExternalAPI.Flight

  @doc """
  Returns the list of flights.
  ## Examples
      iex> list_flights()
      [%Flight{}, ...]
  """
  def list_flights do
    Repo.all(Flight)
  end

  @doc """
  Gets a single flight.
  Raises `Ecto.NoResultsError` if the Flight does not exist.
  ## Examples
      iex> get_flight!(123)
      %Flight{}
      iex> get_flight!(456)
      ** (Ecto.NoResultsError)
  """
  def get_flight!(id), do: Repo.get!(Flight, id)

  @doc """
  Creates a flight.
  ## Examples
      iex> create_flight(%{field: value})
      {:ok, %Flight{}}
      iex> create_flight(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def create_flight(attrs \\ %{}) do
    %Flight{}
    |> Flight.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a flight.
  ## Examples
      iex> update_flight(flight, %{field: new_value})
      {:ok, %Flight{}}
      iex> update_flight(flight, %{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def update_flight(%Flight{} = flight, attrs) do
    flight
    |> Flight.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Flight.
  ## Examples
      iex> delete_flight(flight)
      {:ok, %Flight{}}
      iex> delete_flight(flight)
      {:error, %Ecto.Changeset{}}
  """
  def delete_flight(%Flight{} = flight) do
    Repo.delete(flight)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking flight changes.
  ## Examples
      iex> change_flight(flight)
      %Ecto.Changeset{source: %Flight{}}
  """
  def change_flight(%Flight{} = flight) do
    Flight.changeset(flight, %{})
  end

  def get_flights_by_params(origin, dest, date_from, date_to) do
    # Parses the dates and converts them to Elixir Date objects
    split_date_from = String.split(date_from, "/")
    {:ok, formatted_date_from} = Date.new(
      Enum.at(split_date_from, 2) |> String.to_integer(),
      Enum.at(split_date_from, 0) |> String.to_integer(),
      Enum.at(split_date_from, 1) |> String.to_integer()
    )
    split_date_to = String.split(date_to, "/")
    {:ok, formatted_date_to} = Date.new(
      Enum.at(split_date_to, 2) |> String.to_integer(),
      Enum.at(split_date_to, 0) |> String.to_integer(),
      Enum.at(split_date_to, 1) |> String.to_integer()
    )

    Repo.all(from f in Flight,
      where: f.origin == ^origin
        and f.dest == ^dest
        and f.date_from == ^formatted_date_from
        and f.date_to == ^formatted_date_to
    )
  end
end
