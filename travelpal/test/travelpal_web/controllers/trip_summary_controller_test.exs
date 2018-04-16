defmodule TravelpalWeb.TripSummaryControllerTest do
  use TravelpalWeb.ConnCase

  alias Travelpal.TripSummaries
  alias Travelpal.TripSummaries.TripSummary

  @create_attrs %{summary: "some summary"}
  @update_attrs %{summary: "some updated summary"}
  @invalid_attrs %{summary: nil}

  def fixture(:trip_summary) do
    {:ok, trip_summary} = TripSummaries.create_trip_summary(@create_attrs)
    trip_summary
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tripsummaries", %{conn: conn} do
      conn = get conn, trip_summary_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create trip_summary" do
    test "renders trip_summary when data is valid", %{conn: conn} do
      conn = post conn, trip_summary_path(conn, :create), trip_summary: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, trip_summary_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "summary" => "some summary"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, trip_summary_path(conn, :create), trip_summary: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update trip_summary" do
    setup [:create_trip_summary]

    test "renders trip_summary when data is valid", %{conn: conn, trip_summary: %TripSummary{id: id} = trip_summary} do
      conn = put conn, trip_summary_path(conn, :update, trip_summary), trip_summary: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, trip_summary_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "summary" => "some updated summary"}
    end

    test "renders errors when data is invalid", %{conn: conn, trip_summary: trip_summary} do
      conn = put conn, trip_summary_path(conn, :update, trip_summary), trip_summary: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete trip_summary" do
    setup [:create_trip_summary]

    test "deletes chosen trip_summary", %{conn: conn, trip_summary: trip_summary} do
      conn = delete conn, trip_summary_path(conn, :delete, trip_summary)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, trip_summary_path(conn, :show, trip_summary)
      end
    end
  end

  defp create_trip_summary(_) do
    trip_summary = fixture(:trip_summary)
    {:ok, trip_summary: trip_summary}
  end
end
