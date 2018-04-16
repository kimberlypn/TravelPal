defmodule TravelpalWeb.BookedTripControllerTest do
  use TravelpalWeb.ConnCase

  alias Travelpal.BookedTrips
  alias Travelpal.BookedTrips.BookedTrip

  @create_attrs %{cost: 42, destination: "some destination", end_date: ~D[2010-04-17], passengers: 42, start_date: ~D[2010-04-17]}
  @update_attrs %{cost: 43, destination: "some updated destination", end_date: ~D[2011-05-18], passengers: 43, start_date: ~D[2011-05-18]}
  @invalid_attrs %{cost: nil, destination: nil, end_date: nil, passengers: nil, start_date: nil}

  def fixture(:booked_trip) do
    {:ok, booked_trip} = BookedTrips.create_booked_trip(@create_attrs)
    booked_trip
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all bookedtrips", %{conn: conn} do
      conn = get conn, booked_trip_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create booked_trip" do
    test "renders booked_trip when data is valid", %{conn: conn} do
      conn = post conn, booked_trip_path(conn, :create), booked_trip: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, booked_trip_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "cost" => 42,
        "destination" => "some destination",
        "end_date" => ~D[2010-04-17],
        "passengers" => 42,
        "start_date" => ~D[2010-04-17]}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, booked_trip_path(conn, :create), booked_trip: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update booked_trip" do
    setup [:create_booked_trip]

    test "renders booked_trip when data is valid", %{conn: conn, booked_trip: %BookedTrip{id: id} = booked_trip} do
      conn = put conn, booked_trip_path(conn, :update, booked_trip), booked_trip: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, booked_trip_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "cost" => 43,
        "destination" => "some updated destination",
        "end_date" => ~D[2011-05-18],
        "passengers" => 43,
        "start_date" => ~D[2011-05-18]}
    end

    test "renders errors when data is invalid", %{conn: conn, booked_trip: booked_trip} do
      conn = put conn, booked_trip_path(conn, :update, booked_trip), booked_trip: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete booked_trip" do
    setup [:create_booked_trip]

    test "deletes chosen booked_trip", %{conn: conn, booked_trip: booked_trip} do
      conn = delete conn, booked_trip_path(conn, :delete, booked_trip)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, booked_trip_path(conn, :show, booked_trip)
      end
    end
  end

  defp create_booked_trip(_) do
    booked_trip = fixture(:booked_trip)
    {:ok, booked_trip: booked_trip}
  end
end
