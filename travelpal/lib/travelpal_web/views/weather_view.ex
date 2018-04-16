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
    %{
      city: weather.city,
      date: weather.date,
      high: weather.high,
      low: weather.low,
      text: weather.text,
      forecast: weather.forecast
    }
  end
end
