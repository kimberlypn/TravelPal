defmodule Travelpal.TravelDatesTest do
  use Travelpal.DataCase

  alias Travelpal.TravelDates

  describe "traveldates" do
    alias Travelpal.TravelDates.TravelDate

    @valid_attrs %{destination: "some destination", end_date: ~D[2010-04-17], price_limit: 120.5, start_date: ~D[2010-04-17]}
    @update_attrs %{destination: "some updated destination", end_date: ~D[2011-05-18], price_limit: 456.7, start_date: ~D[2011-05-18]}
    @invalid_attrs %{destination: nil, end_date: nil, price_limit: nil, start_date: nil}

    def travel_date_fixture(attrs \\ %{}) do
      {:ok, travel_date} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TravelDates.create_travel_date()

      travel_date
    end

    test "list_traveldates/0 returns all traveldates" do
      travel_date = travel_date_fixture()
      assert TravelDates.list_traveldates() == [travel_date]
    end

    test "get_travel_date!/1 returns the travel_date with given id" do
      travel_date = travel_date_fixture()
      assert TravelDates.get_travel_date!(travel_date.id) == travel_date
    end

    test "create_travel_date/1 with valid data creates a travel_date" do
      assert {:ok, %TravelDate{} = travel_date} = TravelDates.create_travel_date(@valid_attrs)
      assert travel_date.destination == "some destination"
      assert travel_date.end_date == ~D[2010-04-17]
      assert travel_date.price_limit == 120.5
      assert travel_date.start_date == ~D[2010-04-17]
    end

    test "create_travel_date/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TravelDates.create_travel_date(@invalid_attrs)
    end

    test "update_travel_date/2 with valid data updates the travel_date" do
      travel_date = travel_date_fixture()
      assert {:ok, travel_date} = TravelDates.update_travel_date(travel_date, @update_attrs)
      assert %TravelDate{} = travel_date
      assert travel_date.destination == "some updated destination"
      assert travel_date.end_date == ~D[2011-05-18]
      assert travel_date.price_limit == 456.7
      assert travel_date.start_date == ~D[2011-05-18]
    end

    test "update_travel_date/2 with invalid data returns error changeset" do
      travel_date = travel_date_fixture()
      assert {:error, %Ecto.Changeset{}} = TravelDates.update_travel_date(travel_date, @invalid_attrs)
      assert travel_date == TravelDates.get_travel_date!(travel_date.id)
    end

    test "delete_travel_date/1 deletes the travel_date" do
      travel_date = travel_date_fixture()
      assert {:ok, %TravelDate{}} = TravelDates.delete_travel_date(travel_date)
      assert_raise Ecto.NoResultsError, fn -> TravelDates.get_travel_date!(travel_date.id) end
    end

    test "change_travel_date/1 returns a travel_date changeset" do
      travel_date = travel_date_fixture()
      assert %Ecto.Changeset{} = TravelDates.change_travel_date(travel_date)
    end
  end
end
