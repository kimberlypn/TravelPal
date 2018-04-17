defmodule TravelpalWeb.TravelDateController do
  use TravelpalWeb, :controller

  alias Travelpal.TravelDates
  alias Travelpal.TravelDates.TravelDate

  action_fallback TravelpalWeb.FallbackController

  def index(conn, _params) do
    traveldates = TravelDates.list_traveldates()
    render(conn, "index.json", traveldates: traveldates)
  end

  def create(conn, %{"travel_date" => travel_date_params}) do
    with {:ok, %TravelDate{} = travel_date} <- TravelDates.create_travel_date(travel_date_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", travel_date_path(conn, :show, travel_date))
      |> render("show.json", travel_date: travel_date)
    end
  end

  def show(conn, %{"id" => id}) do
    travel_date = TravelDates.get_travel_date!(id)
    render(conn, "show.json", travel_date: travel_date)
  end

  # Converts a string from "YYYY/MM/DD" to a date object
  def parse_date(date) do
    date = String.split(date, "-")
    yyyy = Enum.at(date, 0) |> String.to_integer()
    mm = Enum.at(date, 1) |> String.to_integer()
    dd = Enum.at(date, 2) |> String.to_integer()
    %Date{year: yyyy, month: mm, day: dd}
  end

  def update(conn, %{"travel_date" => travel_date_params}) do
    travel_date =
      TravelDates.get_travel_date!(Map.get(travel_date_params, "id"))

    travel_date_params = travel_date_params
      |> Map.put("start_date",
        parse_date(Map.get(travel_date_params, "start_date")))
      |> Map.put("end_date",
        parse_date(Map.get(travel_date_params, "end_date")))
      |> Map.put("passengers",
        Map.get(travel_date_params, "passengers")
        |> String.to_integer())
      |> Map.put("price_limit",
        Map.get(travel_date_params, "price_limit")
          |> String.to_integer())

    with {:ok, %TravelDate{} = travel_date} <-
      TravelDates.update_travel_date(travel_date, travel_date_params) do
      conn
      |> put_status(:ok)
      |> put_resp_header("location", page_path(conn, :index))
      |> render("index.json", traveldates: TravelDates.list_traveldates())
    end
  end

  def delete(conn, %{"id" => id}) do
    travel_date = TravelDates.get_travel_date!(id)
    with {:ok, %TravelDate{}} <- TravelDates.delete_travel_date(travel_date) do
      conn
      |> put_status(:ok)
      |> put_resp_header("location", page_path(conn, :index))
      |> render("index.json", traveldates: TravelDates.list_traveldates())
    end
  end
end
