defmodule TravelpalWeb.FlightController do
  use TravelpalWeb, :controller

  alias Travelpal.ExternalAPI
  alias Travelpal.ExternalAPI.Flight

  action_fallback(TravelpalWeb.FallbackController)

  def index(conn, _params) do
    flights = Flight.list_flights()
    render(conn, "index.json", flights: flights)
  end

  def search(conn, %{"origin" => origin, "dest" => dest,
    "date_from" => date_from, "date_to" => date_to}) do
    existing_data =
      ExternalAPI.get_flights_by_params(origin, dest, date_from, date_to)
    converted_origin = String.split(origin, "-") |> Enum.join(" ")
    converted_dest = String.split(dest, "-") |> Enum.join(" ")
    flights = if (!Enum.empty?(existing_data)),
      do: existing_data,
      else: request_flights(converted_origin, converted_dest, date_from, date_to)

    if (Enum.empty?(existing_data)) do
      Enum.each(flights, fn(x) -> ExternalAPI.create_flight(x) end)
    end

    render(conn, "show.json", flight: flights)
  end

  def retrieve_all_flights(conn, _params) do
    # returns all of the flights in the database
    flights = ExternalAPI.list_flights()
    |> Enum.map(fn(x) -> Map.take(x, [:origin, :dest, :date_from, :date_to, :price, :airlines, :duration]) end)

    render(conn, "show.json", flight: flights)
  end

  defp request_flights(origin, dest, date_from, date_to) do
    flight_url = "https://api.skypicker.com/flights"
    # gets top 5 flights
    uri = URI.encode(flight_url
      <> "?flyFrom=#{origin}&to=#{dest}&dateFrom=#{date_from}&dateTo=#{date_from}"
      <> "&returnFrom=#{date_to}&returnTo=#{date_to}&partner=picky&partner_market=us&curr=USD&limit=5")

    # Comment out HTTP request for dev purposes and use dummy data instead
    res = HTTPoison.get!(uri)
    data = Poison.decode!(res.body)

    # dummy_data()
    data["data"]
    |> Enum.map(fn(x) -> format_flight(x, date_from, date_to) end)
  end

  defp format_flight(flight, date_from, date_to) do
    # parses the dates and converts them to Elixir Date objects
    split_date_from = String.split(date_from, "/")
    {:ok, formatted_date_from} = Date.new(
      Enum.at(split_date_from, 2) |> String.to_integer(),
      Enum.at(split_date_from, 0) |> String.to_integer(),
      Enum.at(split_date_from, 1) |> String.to_integer()
    )
    split_date_to = String.split(date_to, "/")
    {:ok, formatted_date_to} = Date.new(
      Enum.at(split_date_to, 2) |> String.to_integer(),
      Enum.at(split_date_to, 0) |> String.to_integer(),
      Enum.at(split_date_to, 1) |> String.to_integer()
    )

    %{
      origin: flight["mapIdfrom"]
        |> String.split("-")
        |> Enum.map(fn(x)->String.capitalize(x) end)
        |> Enum.join(" "),
      dest: flight["mapIdto"]
        |> String.split("-")
        |> Enum.map(fn(x)->String.capitalize(x) end)
        |> Enum.join(" "),
      date_from: formatted_date_from,
      date_to: formatted_date_to,
      price: flight["price"],
      airlines: flight["airlines"],
      duration: flight["duration"]
    }
  end

  defp dummy_data() do
    [
      %{
        "airlines" => ["AS", "UA"],
        "deep_link" =>
          "https://www.kiwi.com/deep?from=BOS&to=LAX&departure=05-08-2018&return=05-12-2018&flightsId=3571213871549614_0%7C3927455603931439_0&price=320&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=TjFsU9KOyjpEDqm5dNSrO1ZjuRMVMgZrERrSppD325T6P8+P9w468E+3gYirNKm0xjFEaQ8brFkJXYHcFnHHQMiKg0Dkoaiav5UhUit795jeFFAqEo1EKVZuez5O1ueoor1vahBPhrpq/0WADMhABtY5vdWSberiYk61VFIJMRp4s6ZSzHyNgbNckdTqU7qdfZpRqVJEtW6IRWoeCiw1GPFDI+Hw1yLpRfB1ptE7vlW9tkkPUjw697wUdcL4Yx28aUCVJRBrCA/L3FNex/RY6mOqHthZ8JQWOD6Y0YUjhUwPGmJACX0xuu88UBNWGVbG3f9HTq2CpG5Ia7H1eZs+S+5Zbl9TxM1P/0iyFcvHGI0DEZeHss34gti+hRSv2W+DDTTJeq1SPB6fOVj+rGl20MF+nQmjjpqw86rcq6cG5Fi706sm7iciWAjIhCba7quYWYzIotUE40rtoc7GuSrSZCk3uO4zcygslqkHcKfisWyMazFn4mEAp3zeWxi8yxSNtZoH+CIGLxT4z/9MizxZQB4ScDmb/ogmDP77vENDVNPOYBVb3hQ0a4sqe8h0na2ExjcDaiubr0TK8M0xCv07UwMl7ZzZCpun4o1ca+H1SKu6cb9FgpHUe1mHfiPB6acjuL7K9kr1hdvIpo3aE24koYDcxxkHFAkgQB6O2L/qCUPQYRurE9MdVAOH8gnVaY0O54TPTy4XBAjKuhCRyE4NrnsNxM8UYnbZfH6XXYs4rCI=",
        "duration" => %{"departure" => 22800, "return" => 19200, "total" => 42000},
        "mapIdfrom" => "boston",
        "mapIdto" => "los-angeles",
        "price" => 320.0
      },
      %{
        "airlines" => ["UA"],
        "deep_link" =>
          "https://www.kiwi.com/deep?from=BOS&to=LAX&departure=05-08-2018&return=05-12-2018&flightsId=3571213871549614_0%7C3927455603931456_0&price=325&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=TjFsU9KOyjpEDqm5dNSrO1ZjuRMVMgZrERrSppD325T6P8+P9w468E+3gYirNKm0xjFEaQ8brFkJXYHcFnHHQMiKg0Dkoaiav5UhUit795jeFFAqEo1EKVZuez5O1ueoor1vahBPhrpq/0WADMhABsNgYFl6+I3dolcFf1aYOhd5FWWXwuRJe9ikXvBVbMk+e4GKjkaF4Vpskiu4iSnDOtLXxRq4e6Koez41GFv9AUb20oJyW10aNHVubuKQ4wWsjH1SJESYhRkW41LukQW6zVdhv3vy87KMyVIeqHDl29MjfODm4DD5Eh/DXS8kniKxnRmYc98FqOVwYcJ00HQlQ7hDCuQqMFcOLy3xP8Z/WZr2B+ERWf5LHrQW2rqrmrt6ZfPxXmKj6NwfXoW7yRLXycnAGtZ+475S0naK+4Gus6NEeEQU9gINyci/mXU6RseKZqT5k1KpZr5347QCZacM3TkzEx8kGXSO/hBC56/XMiN5BdeA6ry0PSMi1MiSXvdxjpoPfurPD26SjrD4+2BBtyUD03NdAyx1Wg7WO5cpoXSJgc/D7QXErGV5hBd4NfJL1HvVhFvqB5Kcxm/rs8QqPJN78xRpJ+dH1PO8wNRqoh6U4DcD6BTsTFlgqxCSRW7ANxq0rXPStOI11K8X3idIUcLlIdqmkBQlJPxUjlCf8IYe5aXzHXLxDjqQyUBlcCojyoG1TImPfDMo9K2Cr0LQFxA1Y4jshr5YCBiyd5dZMkw=",
        "duration" => %{"departure" => 22800, "return" => 19380, "total" => 42180},
        "mapIdfrom" => "boston",
        "mapIdto" => "los-angeles",
        "price" => 325.0
      },
      %{
        "airlines" => ["B6", "AS"],
        "deep_link" =>
          "https://www.kiwi.com/deep?from=BOS&to=LAX&departure=05-08-2018&return=05-12-2018&flightsId=4009918922031857_0%7C3927455603931439_0&price=332&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=TjFsU9KOyjpEDqm5dNSrO1ZjuRMVMgZrERrSppD325T6P8+P9w468E+3gYirNKm0xjFEaQ8brFkJXYHcFnHHQMiKg0Dkoaiav5UhUit795hBYuJzs+k6wEGHRjVL9Zv8lp9myBwP9GcVua7Ntk87g/+DM9IctVZOLLGnmqSjVXsf/AglmEU2VkenIE+uUBUG7WAXklFR/y3jX5lBAHz1UlN3B74dTgXwFwqdHu58uor4oumUZlMVWBt6PfOhzsxpDqkRyptBrVWZMuy/qNVI2Dl7Eb7/dbxgL831nAgm2m+P8VpjKZS06+vlfCoosN3s5OKmV8PQVVNCeZlJBgSsJYbnMyU+Zreb677OZhPWNPUCcjlksMQ7tBpJjv7S4H46vFMz+4MCUcj392tHsZAfvYUXJ1TQ/Z3Wm5iVxbsFGDK+GdwXcH/B1mHUl2XMENHae/Q+Xmnjj4wa4dZrway9tghEOqvX0z3+1qTbdHsjyySYHGb3FCCdQbSfZYRywK+Iqy0YLLB3l4guXpb1fNkeje/RhnM2R1kYY8tnJ6+O3sqqXWtLU8dP2ftolfBNQ0N3CsTBdhsIQJYWXWMfmuXwFHnEk2MWqwcXbgv6jBPq+Ic1T1c/IhuyfLWz/oKgH7GXyTkRKEAzWCoGkUmBgpXQrQfHUgObyLE/Vs7zbOM/9+jVmLfglG4YFot60YfJG9KpiCmWFrivUlNyLMvBuK7SFzZ5cqLakX+lLiZHbsnrv2w=",
        "duration" => %{"departure" => 22920, "return" => 19200, "total" => 42120},
        "mapIdfrom" => "boston",
        "mapIdto" => "los-angeles",
        "price" => 332.0
      },
      %{
        "airlines" => ["B6", "UA"],
        "deep_link" =>
          "https://www.kiwi.com/deep?from=BOS&to=LAX&departure=05-08-2018&return=05-12-2018&flightsId=4009918922031857_0%7C3927455603931456_0&price=337&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=TjFsU9KOyjpEDqm5dNSrO1ZjuRMVMgZrERrSppD325T6P8+P9w468E+3gYirNKm0xjFEaQ8brFkJXYHcFnHHQMiKg0Dkoaiav5UhUit795hBYuJzs+k6wEGHRjVL9Zv8lp9myBwP9GcVua7Ntk87gyS9g5huQ4UdmwW152QhCnNMyLkVrkshDBUTu8WelhUZTIzgimnWncfchd9VAyIDMYKEDIBPH/BmNOufqD0DQqoa/Dr6ygsH0iXVdMb5Meu15Rb4I7Xh2bkGl01lUwpbgBnRk+xxeaBaRsOXppsmrDPf1R/leBTuIuPr8dfUHcQjUcISqU3RxmgBS41t/4oNUlIDmuRFsNWsUCUQu+Ng80x0YkVsqLpCr9/zzWiw7uynQmIp35KilIMWrEraqUaOPZKxz0xozIEG5XzhA7zSXp2BGfikNiXEzprg0gYZ4jAuV+uyd2DhBp0rhGO0yJPgFKp38U8NtsdTjFn46YsIT4/Fy0j8XzlrBQXN5AErD0uvtvmfxxvLvdgDoUkffw7mLW3b1aAH7QAdZjDJqn/lJouuvY0bMSS0C5hFg6BJGaeQBynwsylQ9513e+LNt+O2fFErUBLg2LUtjJMPG4oL2yGxtRPTHjPB2rGYTlL0mcc2ogRanv1kNcKKaszknuXRU8ZQxEE2Ov0CTi72OneBUZGMRiGNm/v2CCa2Fo10T97e8tCvijjk84ZEvGDWeAmEDGTWPkkeHABYd1U2kK9poA4=",
        "duration" => %{"departure" => 22920, "return" => 19380, "total" => 42300},
        "mapIdfrom" => "boston",
        "mapIdto" => "los-angeles",
        "price" => 337.0
      },
      %{
        "airlines" => ["UA"],
        "deep_link" =>
          "https://www.kiwi.com/deep?from=BOS&to=LAX&departure=05-08-2018&return=05-12-2018&flightsId=3571213871549614_0%7C3927455603931455_0&price=339&passengers=1&affilid=picky&lang=en&currency=EUR&booking_token=TjFsU9KOyjpEDqm5dNSrO1ZjuRMVMgZrERrSppD325T6P8+P9w468E+3gYirNKm0xjFEaQ8brFkJXYHcFnHHQMiKg0Dkoaiav5UhUit795jeFFAqEo1EKVZuez5O1ueoor1vahBPhrpq/0WADMhABvHnmXSeLHXmqbHdVEIaINKtythSQJmhEg/NnxhvNJQ36QHa1RqubK9+OTIxdr+PI2YqGpGP0m13Rtu+yC+j7uEMUAzso15/amal0m/npELyg0CfLJmSMMVLKQfcYuxpBAuIH2qR+5O2bi5+BmOIkfOEOAjU20P55A1xI+fHrXkUxXVbiziB+HLR60HzIMvdifP9NhlNHyRuC1VWjvE6MgjNCHJNE233UU0yc1iyrNwdwzXpekbulNpgi2787u3P4C1Jg+597Lc4eDlVAuAsyIdGZxZjuB2SQRwiy3b0RM6crb7GgOv6G559ezgNGZva/o3ti/dWGffPL1gUzgtWka+5aNoGCfKdzBaXc+MW9CM37aPbFMW1l0I8jP23Y0r/6jZ5NaZN5S1V4r2mgfJQomE8r+GLfw2EkWHFyTrDIDo48xRAgWMwioLV3ICNUOUXe7TIJxVtLfwjqDLlMDLXRM3v1pd3i75PI7LwfMqWWKfSC3veuIHAyL5ihnvmUBY+7p1v+P/UExKkWAGEEsh7jExuskFegaD1pm3VHSjr/eNCdh32VdRnfMl9ebPvVqQbyURkJzagWXsL6V+AwnBoEIg=",
        "duration" => %{"departure" => 22800, "return" => 19380, "total" => 42180},
        "mapIdfrom" => "boston",
        "mapIdto" => "los-angeles",
        "price" => 339.0
      }
    ]
  end
end
