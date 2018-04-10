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

  def update(conn, %{"id" => id, "travel_date" => travel_date_params}) do
    travel_date = TravelDates.get_travel_date!(id)

    with {:ok, %TravelDate{} = travel_date} <- TravelDates.update_travel_date(travel_date, travel_date_params) do
      render(conn, "show.json", travel_date: travel_date)
    end
  end

  def delete(conn, %{"id" => id}) do
    travel_date = TravelDates.get_travel_date!(id)
    with {:ok, %TravelDate{}} <- TravelDates.delete_travel_date(travel_date) do
      send_resp(conn, :no_content, "")
    end
  end
end
