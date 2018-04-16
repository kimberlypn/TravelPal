defmodule Travelpal.BookedTripsTest do
  use Travelpal.DataCase

  alias Travelpal.BookedTrips

  describe "bookedtrips" do
    alias Travelpal.BookedTrips.BookedTrip

    @valid_attrs %{cost: 42, destination: "some destination", end_date: ~D[2010-04-17], passengers: 42, start_date: ~D[2010-04-17]}
    @update_attrs %{cost: 43, destination: "some updated destination", end_date: ~D[2011-05-18], passengers: 43, start_date: ~D[2011-05-18]}
    @invalid_attrs %{cost: nil, destination: nil, end_date: nil, passengers: nil, start_date: nil}

    def booked_trip_fixture(attrs \\ %{}) do
      {:ok, booked_trip} =
        attrs
        |> Enum.into(@valid_attrs)
        |> BookedTrips.create_booked_trip()

      booked_trip
    end

    test "list_bookedtrips/0 returns all bookedtrips" do
      booked_trip = booked_trip_fixture()
      assert BookedTrips.list_bookedtrips() == [booked_trip]
    end

    test "get_booked_trip!/1 returns the booked_trip with given id" do
      booked_trip = booked_trip_fixture()
      assert BookedTrips.get_booked_trip!(booked_trip.id) == booked_trip
    end

    test "create_booked_trip/1 with valid data creates a booked_trip" do
      assert {:ok, %BookedTrip{} = booked_trip} = BookedTrips.create_booked_trip(@valid_attrs)
      assert booked_trip.cost == 42
      assert booked_trip.destination == "some destination"
      assert booked_trip.end_date == ~D[2010-04-17]
      assert booked_trip.passengers == 42
      assert booked_trip.start_date == ~D[2010-04-17]
    end

    test "create_booked_trip/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = BookedTrips.create_booked_trip(@invalid_attrs)
    end

    test "update_booked_trip/2 with valid data updates the booked_trip" do
      booked_trip = booked_trip_fixture()
      assert {:ok, booked_trip} = BookedTrips.update_booked_trip(booked_trip, @update_attrs)
      assert %BookedTrip{} = booked_trip
      assert booked_trip.cost == 43
      assert booked_trip.destination == "some updated destination"
      assert booked_trip.end_date == ~D[2011-05-18]
      assert booked_trip.passengers == 43
      assert booked_trip.start_date == ~D[2011-05-18]
    end

    test "update_booked_trip/2 with invalid data returns error changeset" do
      booked_trip = booked_trip_fixture()
      assert {:error, %Ecto.Changeset{}} = BookedTrips.update_booked_trip(booked_trip, @invalid_attrs)
      assert booked_trip == BookedTrips.get_booked_trip!(booked_trip.id)
    end

    test "delete_booked_trip/1 deletes the booked_trip" do
      booked_trip = booked_trip_fixture()
      assert {:ok, %BookedTrip{}} = BookedTrips.delete_booked_trip(booked_trip)
      assert_raise Ecto.NoResultsError, fn -> BookedTrips.get_booked_trip!(booked_trip.id) end
    end

    test "change_booked_trip/1 returns a booked_trip changeset" do
      booked_trip = booked_trip_fixture()
      assert %Ecto.Changeset{} = BookedTrips.change_booked_trip(booked_trip)
    end
  end
end
