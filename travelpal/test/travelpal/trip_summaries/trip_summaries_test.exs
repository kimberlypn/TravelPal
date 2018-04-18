defmodule Travelpal.TripSummariesTest do
  use Travelpal.DataCase

  alias Travelpal.TripSummaries

  describe "tripsummaries" do
    alias Travelpal.TripSummaries.TripSummary

    @valid_attrs %{summary: "some summary"}
    @update_attrs %{summary: "some updated summary"}
    @invalid_attrs %{summary: nil}

    def trip_summary_fixture(attrs \\ %{}) do
      {:ok, trip_summary} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TripSummaries.create_trip_summary()

      trip_summary
    end

    test "list_tripsummaries/0 returns all tripsummaries" do
      trip_summary = trip_summary_fixture()
      assert TripSummaries.list_tripsummaries() == [trip_summary]
    end

    test "get_trip_summary!/1 returns the trip_summary with given id" do
      trip_summary = trip_summary_fixture()
      assert TripSummaries.get_trip_summary!(trip_summary.id) == trip_summary
    end

    test "create_trip_summary/1 with valid data creates a trip_summary" do
      assert {:ok, %TripSummary{} = trip_summary} = TripSummaries.create_trip_summary(@valid_attrs)
      assert trip_summary.summary == "some summary"
    end

    test "create_trip_summary/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TripSummaries.create_trip_summary(@invalid_attrs)
    end

    test "update_trip_summary/2 with valid data updates the trip_summary" do
      trip_summary = trip_summary_fixture()
      assert {:ok, trip_summary} = TripSummaries.update_trip_summary(trip_summary, @update_attrs)
      assert %TripSummary{} = trip_summary
      assert trip_summary.summary == "some updated summary"
    end

    test "update_trip_summary/2 with invalid data returns error changeset" do
      trip_summary = trip_summary_fixture()
      assert {:error, %Ecto.Changeset{}} = TripSummaries.update_trip_summary(trip_summary, @invalid_attrs)
      assert trip_summary == TripSummaries.get_trip_summary!(trip_summary.id)
    end

    test "delete_trip_summary/1 deletes the trip_summary" do
      trip_summary = trip_summary_fixture()
      assert {:ok, %TripSummary{}} = TripSummaries.delete_trip_summary(trip_summary)
      assert_raise Ecto.NoResultsError, fn -> TripSummaries.get_trip_summary!(trip_summary.id) end
    end

    test "change_trip_summary/1 returns a trip_summary changeset" do
      trip_summary = trip_summary_fixture()
      assert %Ecto.Changeset{} = TripSummaries.change_trip_summary(trip_summary)
    end
  end
end
