defmodule Travelpal.AccommodationTest do
  use Travelpal.DataCase

  alias Travelpal.Accommodation

  describe "hotels" do
    alias Travelpal.Accommodation.Hotel

    @valid_attrs %{district: "some district", link: "some link", name: "some name", price: 120.5, rating: 120.5}
    @update_attrs %{district: "some updated district", link: "some updated link", name: "some updated name", price: 456.7, rating: 456.7}
    @invalid_attrs %{district: nil, link: nil, name: nil, price: nil, rating: nil}

    def hotel_fixture(attrs \\ %{}) do
      {:ok, hotel} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accommodation.create_hotel()

      hotel
    end

    test "list_hotels/0 returns all hotels" do
      hotel = hotel_fixture()
      assert Accommodation.list_hotels() == [hotel]
    end

    test "get_hotel!/1 returns the hotel with given id" do
      hotel = hotel_fixture()
      assert Accommodation.get_hotel!(hotel.id) == hotel
    end

    test "create_hotel/1 with valid data creates a hotel" do
      assert {:ok, %Hotel{} = hotel} = Accommodation.create_hotel(@valid_attrs)
      assert hotel.district == "some district"
      assert hotel.link == "some link"
      assert hotel.name == "some name"
      assert hotel.price == 120.5
      assert hotel.rating == 120.5
    end

    test "create_hotel/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accommodation.create_hotel(@invalid_attrs)
    end

    test "update_hotel/2 with valid data updates the hotel" do
      hotel = hotel_fixture()
      assert {:ok, hotel} = Accommodation.update_hotel(hotel, @update_attrs)
      assert %Hotel{} = hotel
      assert hotel.district == "some updated district"
      assert hotel.link == "some updated link"
      assert hotel.name == "some updated name"
      assert hotel.price == 456.7
      assert hotel.rating == 456.7
    end

    test "update_hotel/2 with invalid data returns error changeset" do
      hotel = hotel_fixture()
      assert {:error, %Ecto.Changeset{}} = Accommodation.update_hotel(hotel, @invalid_attrs)
      assert hotel == Accommodation.get_hotel!(hotel.id)
    end

    test "delete_hotel/1 deletes the hotel" do
      hotel = hotel_fixture()
      assert {:ok, %Hotel{}} = Accommodation.delete_hotel(hotel)
      assert_raise Ecto.NoResultsError, fn -> Accommodation.get_hotel!(hotel.id) end
    end

    test "change_hotel/1 returns a hotel changeset" do
      hotel = hotel_fixture()
      assert %Ecto.Changeset{} = Accommodation.change_hotel(hotel)
    end
  end
end
