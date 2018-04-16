defmodule TravelpalWeb.WeatherController do
  use TravelpalWeb, :controller

  alias Travelpal.ExternalAPI
  alias Travelpal.ExternalAPI.Weather

  action_fallback TravelpalWeb.FallbackController

  def index(conn, _params) do
    render(conn, "index.json")
  end

  # Does a search for weather data on the specified city from either the database or an external API request and
  # returns the results in JSON format.
  def search(conn, %{"city" => city}) do
    # @TODO BUG: the city parameter only supports single-word cities, so requested multi-word cities will always
    # return nil when existing data is searched for in the database. Not a huge deal since it still has the external
    # request as a fallback.

    city = String.capitalize(city)
    # weather data for the city in the database; returns a Weather struct with data or nil if none exists
    existing_data = ExternalAPI.get_weather_by_city(city)
    # if there exists a record for the city then use the existing data, else make a request for new data
    weather = if (existing_data != nil), do: existing_data, else: request_weather_by_city(city)

    if (existing_data != nil) do
      # updates the weather in the database with new external data if it's outdated
      if (Date.compare(weather.date, Date.utc_today()) != :eq) do
        weather = request_weather_by_city(city)
        ExternalAPI.update_weather(existing_data, weather)
      end
    else
      # adds a weather record for the city in the database
      ExternalAPI.create_weather(weather)
    end

    render(conn, "show.json", weather: weather)
  end

  # Makes an external API call to request Yahoo Weather data for a specified city.
  defp request_weather_by_city(city) do
    weather_url = "https://query.yahooapis.com/v1/public/yql"
    # relevant columns from the weather table
    columns = ["units", "location", "item",]
    |> Enum.join(", ")
    # Yahoo Weather API uses YSQL to specify data
    ysql_query = "SELECT #{columns} FROM weather.forecast WHERE woeid in (SELECT woeid FROM geo.places(1) WHERE text=\"#{city}\")"
    uri = URI.encode(weather_url <> "?q=#{ysql_query}&format=json")
    # comment out HTTP request for dev purposes and use dummy data instead
    #res = HTTPoison.get!(uri)
    res = dummy_data(city)
    data = Poison.decode!(res.body)["query"]["results"]["channel"]
    # converts all of the dates in the forecast list to Elixir date objects and the temperature strings to integers
    forecast = data["item"]["forecast"]
    |> Enum.map(fn(x) ->
      %{x | "date" => convert_date(x["date"]), "high" => String.to_integer(x["high"]), "low" => String.to_integer(x["low"])}
    end)
    # the current day's forecast info is the first element in the forecast list
    current_day_info = Enum.at(forecast, 0)

    # retrieves the relevant weather details
    weather = %{
      city: data["location"]["city"],
      date: current_day_info["date"],
      high: current_day_info["high"],
      low: current_day_info["low"],
      text: current_day_info["text"],
      forecast: Enum.drop(forecast, 1)
    }
  end

  # Converts a date given by Yahoo Weather to an Elixir date object
  # Yahoo Weather date is in format: "DD Mm YYYY"
  defp convert_date(date) do
    month_map = %{
      "Jan" => 1, "Feb" => 2, "Mar" => 3, "Apr" => 4, "May" => 5, "Jun" => 6, "Jul" => 7, "Aug" => 8, "Sep" => 9,
      "Oct" => 10, "Nov" => 11, "Dec" => 12
    }
    split_date = String.split(date)

    {:ok, date} = Date.new(
      String.to_integer(Enum.at(split_date, 2)),
      month_map[Enum.at(split_date, 1)],
      String.to_integer(Enum.at(split_date, 0))
    )

    date
  end

  def dummy_data do
    %HTTPoison.Response{
      body: "{\"query\":{\"count\":1,\"created\":\"2018-04-12T04:03:38Z\",\"lang\":\"en-US\",\"results\":{\"channel\":{\"location\":{\"city\":\"Boston\",\"country\":\"United States\",\"region\":\" MA\"},\"item\":{\"title\":\"Conditions for Boston, MA, US at 11:00 PM EDT\",\"lat\":\"42.358631\",\"long\":\"-71.056702\",\"link\":\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2367105/\",\"pubDate\":\"Wed, 11 Apr 2018 11:00 PM EDT\",\"condition\":{\"code\":\"31\",\"date\":\"Wed, 11 Apr 2018 11:00 PM EDT\",\"temp\":\"38\",\"text\":\"Clear\"},\"forecast\":[{\"code\":\"11\",\"date\":\"12 Apr 2018\",\"day\":\"Thu\",\"high\":\"53\",\"low\":\"38\",\"text\":\"Showers\"},{\"code\":\"30\",\"date\":\"13 Apr 2018\",\"day\":\"Fri\",\"high\":\"64\",\"low\":\"49\",\"text\":\"Partly Cloudy\"},{\"code\":\"28\",\"date\":\"14 Apr 2018\",\"day\":\"Sat\",\"high\":\"63\",\"low\":\"44\",\"text\":\"Mostly Cloudy\"},{\"code\":\"11\",\"date\":\"15 Apr 2018\",\"day\":\"Sun\",\"high\":\"43\",\"low\":\"40\",\"text\":\"Showers\"},{\"code\":\"47\",\"date\":\"16 Apr 2018\",\"day\":\"Mon\",\"high\":\"57\",\"low\":\"44\",\"text\":\"Scattered Thunderstorms\"},{\"code\":\"28\",\"date\":\"17 Apr 2018\",\"day\":\"Tue\",\"high\":\"48\",\"low\":\"41\",\"text\":\"Mostly Cloudy\"},{\"code\":\"30\",\"date\":\"18 Apr 2018\",\"day\":\"Wed\",\"high\":\"52\",\"low\":\"38\",\"text\":\"Partly Cloudy\"},{\"code\":\"30\",\"date\":\"19 Apr 2018\",\"day\":\"Thu\",\"high\":\"52\",\"low\":\"44\",\"text\":\"Partly Cloudy\"},{\"code\":\"30\",\"date\":\"20 Apr 2018\",\"day\":\"Fri\",\"high\":\"51\",\"low\":\"42\",\"text\":\"Partly Cloudy\"},{\"code\":\"30\",\"date\":\"21 Apr 2018\",\"day\":\"Sat\",\"high\":\"52\",\"low\":\"42\",\"text\":\"Partly Cloudy\"}],\"description\":\"<![CDATA[<img src=\\\"http://l.yimg.com/a/i/us/we/52/31.gif\\\"/>\\n<BR />\\n<b>Current Conditions:</b>\\n<BR />Clear\\n<BR />\\n<BR />\\n<b>Forecast:</b>\\n<BR /> Thu - Showers. High: 53Low: 38\\n<BR /> Fri - Partly Cloudy. High: 64Low: 49\\n<BR /> Sat - Mostly Cloudy. High: 63Low: 44\\n<BR /> Sun - Showers. High: 43Low: 40\\n<BR /> Mon - Scattered Thunderstorms. High: 57Low: 44\\n<BR />\\n<BR />\\n<a href=\\\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-2367105/\\\">Full Forecast at Yahoo! Weather</a>\\n<BR />\\n<BR />\\n<BR />\\n]]>\",\"guid\":{\"isPermaLink\":\"false\"}},\"units\":{\"distance\":\"mi\",\"pressure\":\"in\",\"speed\":\"mph\",\"temperature\":\"F\"}}}}}",
      headers: [
        {"X-Content-Type-Options", "nosniff"},
        {"Access-Control-Allow-Origin", "*"},
        {"Content-Type", "application/json;charset=utf-8"},
        {"Cache-Control", "no-cache"},
        {"Date", "Thu, 12 Apr 2018 04:03:38 GMT"},
        {"Age", "0"},
        {"Transfer-Encoding", "chunked"},
        {"Connection", "keep-alive"},
        {"Strict-Transport-Security", "max-age=31536000"},
        {"Via", "http/1.1 a34.ue.bf1.yahoo.net (ApacheTrafficServer [cMsSf ])"},
        {"Server", "ATS"},
        {"Public-Key-Pins-Report-Only",
        "max-age=2592000; pin-sha256=\"2oALgLKofTmeZvoZ1y/fSZg7R9jPMix8eVA6DH4o/q8=\"; pin-sha256=\"cAajgxHlj7GTSEIzIYIQxmEloOSoJq7VOaxWHfv72QM=\"; pin-sha256=\"SVqWumuteCQHvVIaALrOZXuzVVVeS7f4FGxxu6V+es4=\"; pin-sha256=\"UZJDjsNp1+4M5x9cbbdflB779y5YRBcV6Z6rBMLIrO4=\"; pin-sha256=\"JbQbUG5JMJUoI6brnx0x3vZF6jilxsapbXGVfjhN8Fg=\"; pin-sha256=\"lnsM2T/O9/J84sJFdnrpsFp3awZJ+ZZbYpCWhGloaHI=\"; pin-sha256=\"h6801m+z8v3zbgkRHpq6L29Esgfzhj89C1SyUCOQmqU=\"; pin-sha256=\"SQVGZiOrQXi+kqxcvWWE96HhfydlLVqFr4lQTqI5qqo=\"; pin-sha256=\"q5hJUnat8eyv8o81xTBIeB5cFxjaucjmelBPT2pRMo8=\"; pin-sha256=\"vPtEqrmtAhAVcGtBIep2HIHJ6IlnWQ9vlK50TciLePs=\"; pin-sha256=\"lpkiXF3lLlbN0y3y6W0c/qWqPKC7Us2JM8I7XCdEOCA=\"; pin-sha256=\"r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E=\"; pin-sha256=\"WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18=\"; pin-sha256=\"2fRAUXyxl4A1/XHrKNBmc8bTkzA7y4FB/GLJuNAzCqY=\"; pin-sha256=\"dolnbtzEBnELx/9lOEQ22e6OZO/QNb6VSSX2XHA3E7A=\"; includeSubdomains; report-uri=\"http://csp.yahoo.com/beacon/csp?src=yahoocom-hpkp-report-only\""},
        {"Expect-CT",
        "max-age=31536000; report-uri=\"http://csp.yahoo.com/beacon/csp?src=yahoocom-expect-ct-report-only\""}
      ],
      request_url: "https://query.yahooapis.com/v1/public/yql?q=SELECT%20units,%20location,%20item%20FROM%20weather.forecast%20WHERE%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places(1)%20WHERE%20text=%22boston%22)&format=json",
      status_code: 200
    }
  end
end
