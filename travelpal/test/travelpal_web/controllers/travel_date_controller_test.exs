defmodule TravelpalWeb.TravelDateControllerTest do
  use TravelpalWeb.ConnCase

  alias Travelpal.TravelDates
  alias Travelpal.TravelDates.TravelDate

  @create_attrs %{destination: "some destination", end_date: ~D[2010-04-17], price_limit: 120.5, start_date: ~D[2010-04-17]}
  @update_attrs %{destination: "some updated destination", end_date: ~D[2011-05-18], price_limit: 456.7, start_date: ~D[2011-05-18]}
  @invalid_attrs %{destination: nil, end_date: nil, price_limit: nil, start_date: nil}

  def fixture(:travel_date) do
    {:ok, travel_date} = TravelDates.create_travel_date(@create_attrs)
    travel_date
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all traveldates", %{conn: conn} do
      conn = get conn, travel_date_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create travel_date" do
    test "renders travel_date when data is valid", %{conn: conn} do
      conn = post conn, travel_date_path(conn, :create), travel_date: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, travel_date_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "destination" => "some destination",
        "end_date" => ~D[2010-04-17],
        "price_limit" => 120.5,
        "start_date" => ~D[2010-04-17]}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, travel_date_path(conn, :create), travel_date: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update travel_date" do
    setup [:create_travel_date]

    test "renders travel_date when data is valid", %{conn: conn, travel_date: %TravelDate{id: id} = travel_date} do
      conn = put conn, travel_date_path(conn, :update, travel_date), travel_date: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, travel_date_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "destination" => "some updated destination",
        "end_date" => ~D[2011-05-18],
        "price_limit" => 456.7,
        "start_date" => ~D[2011-05-18]}
    end

    test "renders errors when data is invalid", %{conn: conn, travel_date: travel_date} do
      conn = put conn, travel_date_path(conn, :update, travel_date), travel_date: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete travel_date" do
    setup [:create_travel_date]

    test "deletes chosen travel_date", %{conn: conn, travel_date: travel_date} do
      conn = delete conn, travel_date_path(conn, :delete, travel_date)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, travel_date_path(conn, :show, travel_date)
      end
    end
  end

  defp create_travel_date(_) do
    travel_date = fixture(:travel_date)
    {:ok, travel_date: travel_date}
  end
end
