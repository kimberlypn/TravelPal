defmodule Travelpal.ExternalAPITest do
  use Travelpal.DataCase

  alias Travelpal.ExternalAPI

  describe "weathers" do
    alias Travelpal.ExternalAPI.Weather

    @valid_attrs %{high_temp: 42, location: "some location", low_temp: 42}
    @update_attrs %{high_temp: 43, location: "some updated location", low_temp: 43}
    @invalid_attrs %{high_temp: nil, location: nil, low_temp: nil}

    def weather_fixture(attrs \\ %{}) do
      {:ok, weather} =
        attrs
        |> Enum.into(@valid_attrs)
        |> ExternalAPI.create_weather()

      weather
    end

    test "list_weathers/0 returns all weathers" do
      weather = weather_fixture()
      assert ExternalAPI.list_weathers() == [weather]
    end

    test "get_weather!/1 returns the weather with given id" do
      weather = weather_fixture()
      assert ExternalAPI.get_weather!(weather.id) == weather
    end

    test "create_weather/1 with valid data creates a weather" do
      assert {:ok, %Weather{} = weather} = ExternalAPI.create_weather(@valid_attrs)
      assert weather.high_temp == 42
      assert weather.location == "some location"
      assert weather.low_temp == 42
    end

    test "create_weather/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = ExternalAPI.create_weather(@invalid_attrs)
    end

    test "update_weather/2 with valid data updates the weather" do
      weather = weather_fixture()
      assert {:ok, weather} = ExternalAPI.update_weather(weather, @update_attrs)
      assert %Weather{} = weather
      assert weather.high_temp == 43
      assert weather.location == "some updated location"
      assert weather.low_temp == 43
    end

    test "update_weather/2 with invalid data returns error changeset" do
      weather = weather_fixture()
      assert {:error, %Ecto.Changeset{}} = ExternalAPI.update_weather(weather, @invalid_attrs)
      assert weather == ExternalAPI.get_weather!(weather.id)
    end

    test "delete_weather/1 deletes the weather" do
      weather = weather_fixture()
      assert {:ok, %Weather{}} = ExternalAPI.delete_weather(weather)
      assert_raise Ecto.NoResultsError, fn -> ExternalAPI.get_weather!(weather.id) end
    end

    test "change_weather/1 returns a weather changeset" do
      weather = weather_fixture()
      assert %Ecto.Changeset{} = ExternalAPI.change_weather(weather)
    end
  end
end
