defmodule TravelpalWeb.WeatherView do
  use TravelpalWeb, :view
  alias TravelpalWeb.WeatherView

  def render("index.json", %{weathers: weathers}) do
    %{data: render_many(weathers, WeatherView, "weather.json")}
  end

  def render("show.json", %{weather: weather}) do
    %{data: render_one(weather, WeatherView, "weather.json")}
  end

  def render("weather.json", %{weather: weather}) do
    decoded_weather = Poison.decode!(weather)

    %{
      units: decoded_weather["units"],
      location: decoded_weather["location"],
      item: decoded_weather["item"],
    }
  end
end
