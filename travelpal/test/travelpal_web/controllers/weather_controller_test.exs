defmodule TravelpalWeb.WeatherControllerTest do
  use TravelpalWeb.ConnCase

  alias Travelpal.ExternalAPI
  alias Travelpal.ExternalAPI.Weather

  @create_attrs %{high_temp: 42, location: "some location", low_temp: 42}
  @update_attrs %{high_temp: 43, location: "some updated location", low_temp: 43}
  @invalid_attrs %{high_temp: nil, location: nil, low_temp: nil}

  def fixture(:weather) do
    {:ok, weather} = ExternalAPI.create_weather(@create_attrs)
    weather
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all weathers", %{conn: conn} do
      conn = get conn, weather_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create weather" do
    test "renders weather when data is valid", %{conn: conn} do
      conn = post conn, weather_path(conn, :create), weather: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, weather_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "high_temp" => 42,
        "location" => "some location",
        "low_temp" => 42}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, weather_path(conn, :create), weather: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update weather" do
    setup [:create_weather]

    test "renders weather when data is valid", %{conn: conn, weather: %Weather{id: id} = weather} do
      conn = put conn, weather_path(conn, :update, weather), weather: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, weather_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "high_temp" => 43,
        "location" => "some updated location",
        "low_temp" => 43}
    end

    test "renders errors when data is invalid", %{conn: conn, weather: weather} do
      conn = put conn, weather_path(conn, :update, weather), weather: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete weather" do
    setup [:create_weather]

    test "deletes chosen weather", %{conn: conn, weather: weather} do
      conn = delete conn, weather_path(conn, :delete, weather)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, weather_path(conn, :show, weather)
      end
    end
  end

  defp create_weather(_) do
    weather = fixture(:weather)
    {:ok, weather: weather}
  end
end
