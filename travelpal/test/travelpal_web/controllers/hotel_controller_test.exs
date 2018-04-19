defmodule TravelpalWeb.HotelControllerTest do
  use TravelpalWeb.ConnCase

  alias Travelpal.Accommodation
  alias Travelpal.Accommodation.Hotel

  @create_attrs %{district: "some district", link: "some link", name: "some name", price: 120.5, rating: 120.5}
  @update_attrs %{district: "some updated district", link: "some updated link", name: "some updated name", price: 456.7, rating: 456.7}
  @invalid_attrs %{district: nil, link: nil, name: nil, price: nil, rating: nil}

  def fixture(:hotel) do
    {:ok, hotel} = Accommodation.create_hotel(@create_attrs)
    hotel
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all hotels", %{conn: conn} do
      conn = get conn, hotel_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create hotel" do
    test "renders hotel when data is valid", %{conn: conn} do
      conn = post conn, hotel_path(conn, :create), hotel: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, hotel_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "district" => "some district",
        "link" => "some link",
        "name" => "some name",
        "price" => 120.5,
        "rating" => 120.5}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, hotel_path(conn, :create), hotel: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update hotel" do
    setup [:create_hotel]

    test "renders hotel when data is valid", %{conn: conn, hotel: %Hotel{id: id} = hotel} do
      conn = put conn, hotel_path(conn, :update, hotel), hotel: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, hotel_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "district" => "some updated district",
        "link" => "some updated link",
        "name" => "some updated name",
        "price" => 456.7,
        "rating" => 456.7}
    end

    test "renders errors when data is invalid", %{conn: conn, hotel: hotel} do
      conn = put conn, hotel_path(conn, :update, hotel), hotel: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete hotel" do
    setup [:create_hotel]

    test "deletes chosen hotel", %{conn: conn, hotel: hotel} do
      conn = delete conn, hotel_path(conn, :delete, hotel)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, hotel_path(conn, :show, hotel)
      end
    end
  end

  defp create_hotel(_) do
    hotel = fixture(:hotel)
    {:ok, hotel: hotel}
  end
end
