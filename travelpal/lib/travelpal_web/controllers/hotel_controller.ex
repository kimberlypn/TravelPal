defmodule TravelpalWeb.HotelController do
  use TravelpalWeb, :controller

  alias Travelpal.Accomadation
  alias Travelpal.Accomadation.Hotel

  action_fallback TravelpalWeb.FallbackController

  def callPythonScript(location) do
    (System.cmd "python3", ["./scrape-hotels.py", "-dest", location])
    |> IO.inspect
  end

  def index(conn, _params) do
    hotels = Accomadation.list_hotels()
    render(conn, "index.json", hotels: hotels)
  end

  def create(conn, %{"hotel" => hotel_params}) do
    with {:ok, %Hotel{} = hotel} <- Accomadation.create_hotel(hotel_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", hotel_path(conn, :show, hotel))
      |> render("show.json", hotel: hotel)
    end
  end

  def show(conn, %{"id" => id}) do
    hotel = Accomadation.get_hotel!(id)
    render(conn, "show.json", hotel: hotel)
  end

  def update(conn, %{"id" => id, "hotel" => hotel_params}) do
    hotel = Accomadation.get_hotel!(id)

    with {:ok, %Hotel{} = hotel} <- Accomadation.update_hotel(hotel, hotel_params) do
      render(conn, "show.json", hotel: hotel)
    end
  end

  def delete(conn, %{"id" => id}) do
    hotel = Accomadation.get_hotel!(id)
    with {:ok, %Hotel{}} <- Accomadation.delete_hotel(hotel) do
      send_resp(conn, :no_content, "")
    end
  end
end
