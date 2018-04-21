defmodule TravelpalWeb.HotelController do
  use TravelpalWeb, :controller

  alias Travelpal.Accommodation
  alias Travelpal.Accommodation.Hotel

  action_fallback TravelpalWeb.FallbackController

  def scrape_hotel_information(location) do
    "python3"
    |> System.cmd(["./scrape-hotels.py", "--dest", location, "--store", "1"])
  end

  def get_hotel_information(conn, %{"info" => travel_info}) do

    l_location = String.downcase(travel_info["location"])
    hotels = Accommodation.list_hotels_by_location(l_location)

    # only call script if the given location has not been searched
    hotels =
      if length(hotels) == 0 do
        scrape_hotel_information(l_location)
        Accommodation.list_hotels_by_location(l_location)
      else
        hotels
      end
      
    render(conn, "index.json", hotels: Enum.take(hotels, -15))
  end


  def index(conn, params) do
    IO.inspect params
    hotels = Accommodation.list_hotels()
    render(conn, "index.json", hotels: hotels)
  end

  def create(conn, %{"hotel" => hotel_params}) do
    with {:ok, %Hotel{} = hotel} <- Accommodation.create_hotel(hotel_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", hotel_path(conn, :show, hotel))
      |> render("show.json", hotel: hotel)
    end
  end


  def show(conn, %{"id" => id}) do
    hotel = Accommodation.get_hotel!(id)
    render(conn, "show.json", hotel: hotel)
  end

  def update(conn, %{"id" => id, "hotel" => hotel_params}) do
    hotel = Accommodation.get_hotel!(id)

    with {:ok, %Hotel{} = hotel} <- Accommodation.update_hotel(hotel, hotel_params) do
      render(conn, "show.json", hotel: hotel)
    end
  end

  def delete(conn, %{"id" => id}) do
    hotel = Accommodation.get_hotel!(id)
    with {:ok, %Hotel{}} <- Accommodation.delete_hotel(hotel) do
      send_resp(conn, :no_content, "")
    end
  end
end
