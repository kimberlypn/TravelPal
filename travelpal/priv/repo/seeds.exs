# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Travelpal.Repo.insert!(%Travelpal.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Travelpal.Repo.insert!(%Travelpal.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Travelpal.Repo
  alias Travelpal.Users.User
  alias Travelpal.Friends.Friend
  alias Travelpal.TravelDates.TravelDate
  alias Travelpal.BookedTrips.BookedTrip
  alias Travelpal.ExternalAPI.Flight
  alias Travelpal.Accommodation.Hotel

  def insert_users do
    Repo.delete_all(User)
    pass1 = Comeonin.Argon2.hashpwsalt("mdangpass")
    pass2 = Comeonin.Argon2.hashpwsalt("kimberlypnpass")
    pass3 = Comeonin.Argon2.hashpwsalt("long74100pass")
    pass4 = Comeonin.Argon2.hashpwsalt("guo-williampass")

    Repo.insert!(%User{
      email: "matt@example.com",
      name: "Matt Dang",
      username: "mdang",
      password_hash: pass1,
      budget: 4000
    })
    Repo.insert!(%User{
      email: "kimberly@example.com",
      name: "Kimberly Nguyen",
      username: "kimberlypn",
      password_hash: pass2,
      budget: 3000
    })
    Repo.insert!(%User{
      email: "long@example.com",
      name: "Long Lin",
      username: "long74100",
      password_hash: pass3,
      budget: 2000
    })
    Repo.insert!(%User{
      email: "will@example.com",
      name: "William Guo",
      username: "guo-william",
      password_hash: pass4,
      budget: 1000
    })
  end

  def insert_friends do
    Repo.delete_all(Friend)
    Repo.insert!(%Friend{requestor_id: 3, acceptor_id: 1, status: "Accepted"})
    Repo.insert!(%Friend{requestor_id: 4, acceptor_id: 1, status: "Accepted"})
    Repo.insert!(%Friend{requestor_id: 1, acceptor_id: 2, status: "Accepted"})
    Repo.insert!(%Friend{requestor_id: 3, acceptor_id: 2, status: "Pending"})
    Repo.insert!(%Friend{requestor_id: 4, acceptor_id: 2, status: "Accepted"})
    Repo.insert!(%Friend{requestor_id: 4, acceptor_id: 3, status: "Pending"})
  end

  def insert_travel_dates do
    Repo.delete_all(TravelDate)
    # Matt's trips
    Repo.insert!(%TravelDate{
      origin: "Boston",
      destination: "Bangkok",
      end_date: ~D[2019-05-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2019-05-01],
      user_id: 1
    })
    Repo.insert!(%TravelDate{
      origin: "Boston",
      destination: "Casablanca",
      end_date: ~D[2018-12-30],
      price_limit: 3000,
      start_date: ~D[2018-12-01],
      user_id: 1
    })

    # Kimberly's trips
    Repo.insert!(%TravelDate{
      origin: "Boston",
      destination: "Beijing",
      end_date: ~D[2019-03-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2019-03-01],
      user_id: 2
    })
    Repo.insert!(%TravelDate{
      origin: "Boston",
      destination: "Singapore",
      end_date: ~D[2018-12-20],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2018-12-01],
      user_id: 2
    })

    # Long's trips
    Repo.insert!(%TravelDate{
      origin: "Boston",
      destination: "Bangkok",
      end_date: ~D[2019-05-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2019-05-01],
      user_id: 3
    })
    Repo.insert!(%TravelDate{
      origin: "Boston",
      destination: "Casablanca",
      end_date: ~D[2018-12-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2018-12-01],
      user_id: 3
    })

    # Will's trips
    Repo.insert!(%TravelDate{
      origin: "Boston",
      destination: "Bangkok",
      end_date: ~D[2019-05-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2019-05-01],
      user_id: 4
    })
    Repo.insert!(%TravelDate{
      origin: "Boston",
      destination: "Casablanca",
      end_date: ~D[2018-12-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2018-12-01],
      user_id: 4
    })
  end

  def insert_flights do
    Repo.delete_all(Flight)
    Repo.insert!(%Flight{
      origin: "Boston",
      dest: "Los Angeles",
      date_from: ~D[2018-05-08],
      date_to: ~D[2018-05-12],
      price: 400.0,
      airlines: ["American Airlines"],
      duration: %{"departure" => 22800, "return" => 19200, "total" => 42000}
    })
    Repo.insert!(%Flight{
      origin: "Chicago",
      dest: "Tokyo",
      date_from: ~D[2018-06-10],
      date_to: ~D[2018-07-16],
      price: 900.0,
      airlines: ["Delta", "American Airlines"],
      duration: %{"departure" => 22800, "return" => 19200, "total" => 42000}
    })
    Repo.insert!(%Flight{
      origin: "Miami",
      dest: "Alaska",
      date_from: ~D[2018-05-08],
      date_to: ~D[2018-05-12],
      price: 600.0,
      airlines: ["Alaska Airlines", "American Airlines"],
      duration: %{"departure" => 22800, "return" => 19200, "total" => 42000}
    })
    Repo.insert!(%Flight{
      origin: "London",
      dest: "Los Angeles",
      date_from: ~D[2018-05-08],
      date_to: ~D[2018-05-12],
      price: 1000.0,
      airlines: ["American Airlines"],
      duration: %{"departure" => 22800, "return" => 19200, "total" => 42000}
    })
    Repo.insert!(%Flight{
      origin: "Atlanta",
      dest: "Chicago",
      date_from: ~D[2018-05-08],
      date_to: ~D[2018-05-12],
      price: 250.0,
      airlines: ["JetBlue", "Delta"],
      duration: %{"departure" => 22800, "return" => 19200, "total" => 42000}
    })
  end

  def insert_hotels do
    Repo.delete_all(Hotel)
    Repo.insert!(%Hotel{
      name: "Hyatt", district: "Downtown",
      price: 125.0,
      link: "www.hotel.com/hyatt",
      rating: 4.5,
      result_from: "Boston"
    })
    Repo.insert!(%Hotel{
      name: "Sheraton",
      district: "Seaport",
      price: 133.3,
      link: "www.hotel.com/sheraton",
      rating: 3.5,
      result_from: "Boston"
    })
    Repo.insert!(%Hotel{
      name: "Best Western",
      district: "South Boston",
      price: 125.45,
      link: "www.hotel.com/best_western",
      rating: 4.5,
      result_from: "Boston"
    })
    Repo.insert!(%Hotel{
      name: "Westin",
      district: "Downtown",
      price: 125.5,
      link: "www.hotel.com/Westin",
      rating: 5.0,
      result_from: "Boston"
    })
  end

  def insert_booked_trips do
    Repo.delete_all(BookedTrip)
    # Matt's trips
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Melbourne",
      start_date: ~D[2016-10-10],
      end_date: ~D[2016-10-20],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 1,
      cost: 3000,
      rooms: 1,
      summary: "So many kangaroos!",
      user_id: 1,
      flight_id: 1,
      hotel_id: 1
    })
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Seoul",
      start_date: ~D[2018-04-20],
      end_date: ~D[2018-04-30],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 2,
      cost: 3000,
      rooms: 1,
      summary: "",
      user_id: 1,
      flight_id: 2,
      hotel_id: 3
    })
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Tokyo",
      start_date: ~D[2018-06-01],
      end_date: ~D[2018-07-01],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 1,
      cost: 2000,
      rooms: 0,
      summary: "",
      user_id: 1,
      flight_id: 1
    })

    # Kimberly's trips
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Honolulu",
      start_date: ~D[2017-01-01],
      end_date: ~D[2017-01-20],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 1,
      cost: 1500,
      rooms: 0,
      summary: "Fun in the sun.",
      user_id: 2,
      flight_id: 4
    })
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Rome",
      start_date: ~D[2018-04-19],
      end_date: ~D[2018-04-25],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 1,
      cost: 1000,
      rooms: 1,
      summary: "",
      user_id: 2,
      flight_id: 2,
      hotel_id: 1
    })
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Tokyo",
      start_date: ~D[2018-06-01],
      end_date: ~D[2018-07-01],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 2,
      cost: 2000,
      rooms: 1,
      summary: "",
      user_id: 2,
      flight_id: 1,
      hotel_id: 1
    })

    # Long's trips
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Melbourne",
      start_date: ~D[2016-10-10],
      end_date: ~D[2016-10-20],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 3,
      cost: 3000,
      rooms: 2,
      summary: "Isn't Matt going next year?",
      user_id: 3,
      flight_id: 4,
      hotel_id: 4
    })
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Seoul",
      start_date: ~D[2018-04-20],
      end_date: ~D[2018-04-30],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 2,
      cost: 3000,
      rooms: 1,
      summary: "",
      user_id: 3,
      flight_id: 1,
      hotel_id: 1
    })
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Tokyo",
      start_date: ~D[2018-06-01],
      end_date: ~D[2018-07-01],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 1,
      cost: 2000,
      rooms: 0,
      summary: "",
      user_id: 3,
      flight_id: 4
    })

    # Will's trips
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Melbourne",
      start_date: ~D[2016-10-10],
      end_date: ~D[2016-10-20],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 5,
      cost: 3000,
      rooms: 5,
      summary: "Wonder when Long is going to get here.",
      user_id: 4,
      flight_id: 4,
      hotel_id: 3
    })
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Seoul",
      start_date: ~D[2018-04-20],
      end_date: ~D[2018-04-30],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 2,
      cost: 3000,
      rooms: 0,
      summary: "",
      user_id: 4,
      flight_id: 1
    })
    Repo.insert!(%BookedTrip{
      origin: "Boston",
      destination: "Tokyo",
      start_date: ~D[2018-06-01],
      end_date: ~D[2018-07-01],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 4,
      cost: 2000,
      rooms: 2,
      summary: "",
      user_id: 4,
      flight_id: 2,
      hotel_id: 2
    })
  end

  def run do
    insert_users()
    insert_friends()
    insert_travel_dates()
    insert_flights()
    insert_hotels()
    insert_booked_trips()
  end

  def seed(:dev) do
    run()
  end

  def seed(:prod) do
    # run()
  end
end

Seeds.seed(Mix.env)
