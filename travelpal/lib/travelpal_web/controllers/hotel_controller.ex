defmodule TravelpalWeb.HotelController do
  use TravelpalWeb, :controller

  alias Travelpal.Accommodation
  alias Travelpal.Accommodation.Hotel

  action_fallback TravelpalWeb.FallbackController

  def scrape_hotel_information(location, start_date, end_date) do
    "python3"
    |> System.cmd(["./scrape-hotels.py", "--dest", location, "--store", "1",
        "--sdate", start_date, "--edate", end_date])
  end

  def get_hotel_information(conn, %{"info" => travel_info}) do

    l_location = String.downcase(travel_info["location"])
    start_date = travel_info["start_date"]
    end_date = travel_info["end_date"]
    budget = travel_info["budget"]

    hotels = Accommodation.list_hotels_by_location(l_location)
    # call script if the location has not been searched
    hotels =
      if length(hotels) == 0 do
        scrape_hotel_information(l_location, start_date, end_date)
        Accommodation.list_hotels_by_location(l_location)
      else
        # update the links with the given dates
        hotels
        |> Enum.map(fn hotel -> hotel
                                |> Map.get_and_update(:link, fn current_link ->
                                   {current_link, replace_dates_in_link(current_link, start_date, end_date)} end)
                                |> elem(1) end)
      end

    render(conn, "index.json", hotels: Enum.filter(hotels, fn hotel -> hotel.price < budget end))
  end

  defp replace_dates_in_link(link, checkin, checkout) do
    link
    |> String.split(";")
    |> List.replace_at(1, ";checkin=" <> checkin)
    |> List.replace_at(2, ";checkout=" <> checkout <> ";")
    |> List.delete_at(3)
    |> Enum.join("")
  end


  def index(conn, params) do
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
