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
  alias Travelpal.Flights.Flight
  alias Travelpal.Hotels.Hotel

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
      destination: "Bangkok",
      end_date: ~D[2019-05-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2019-05-01],
      user_id: 1
    })
    Repo.insert!(%TravelDate{
      destination: "Casablanca",
      end_date: ~D[2018-12-30],
      price_limit: 3000,
      start_date: ~D[2018-12-01],
      user_id: 1
    })

    # Kimberly's trips
    Repo.insert!(%TravelDate{
      destination: "Beijing",
      end_date: ~D[2019-03-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2019-03-01],
      user_id: 2
    })
    Repo.insert!(%TravelDate{
      destination: "Singapore",
      end_date: ~D[2018-12-20],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2018-12-01],
      user_id: 2
    })

    # Long's trips
    Repo.insert!(%TravelDate{
      destination: "Bangkok",
      end_date: ~D[2019-05-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2019-05-01],
      user_id: 3
    })
    Repo.insert!(%TravelDate{
      destination: "Casablanca",
      end_date: ~D[2018-12-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2018-12-01],
      user_id: 3
    })

    # Will's trips
    Repo.insert!(%TravelDate{
      destination: "Bangkok",
      end_date: ~D[2019-05-30],
      price_limit: 3000,
      passengers: 1,
      start_date: ~D[2019-05-01],
      user_id: 4
    })
    Repo.insert!(%TravelDate{
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
    Repo.insert!(%Flight{airline: "American Airlines"})
    Repo.insert!(%Flight{airline: "Delta"})
    Repo.insert!(%Flight{airline: "Alaska Airlines"})
    Repo.insert!(%Flight{airline: "Southwest"})
    Repo.insert!(%Flight{airline: "JetBlue"})
  end

  def insert_hotels do
    Repo.delete_all(Hotel)
    Repo.insert!(%Hotel{name: "Hyatt"})
    Repo.insert!(%Hotel{name: "Sheraton"})
    Repo.insert!(%Hotel{name: "Best Western"})
    Repo.insert!(%Hotel{name: "Westin"})
  end

  def insert_booked_trips do
    Repo.delete_all(BookedTrip)
    # Matt's trips
    Repo.insert!(%BookedTrip{
      destination: "Melbourne",
      start_date: ~D[2016-10-10],
      end_date: ~D[2016-10-20],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 1,
      cost: 3000,
      rooms: 1,
      user_id: 1,
      flight_id: 1,
      hotel_id: 1
    })
    Repo.insert!(%BookedTrip{
      destination: "Seoul",
      start_date: ~D[2018-04-20],
      end_date: ~D[2018-04-30],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 2,
      cost: 3000,
      rooms: 1,
      user_id: 1,
      flight_id: 2,
      hotel_id: 3
    })
    Repo.insert!(%BookedTrip{
      destination: "Tokyo",
      start_date: ~D[2018-06-01],
      end_date: ~D[2018-07-01],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 1,
      cost: 2000,
      rooms: 0,
      user_id: 1,
      flight_id: 1
    })

    # Kimberly's trips
    Repo.insert!(%BookedTrip{
      destination: "Honolulu",
      start_date: ~D[2017-01-01],
      end_date: ~D[2017-01-20],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 1,
      cost: 1500,
      rooms: 0,
      user_id: 2,
      flight_id: 4
    })
    Repo.insert!(%BookedTrip{
      destination: "Rome",
      start_date: ~D[2018-04-19],
      end_date: ~D[2018-04-25],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 1,
      cost: 1000,
      rooms: 1,
      user_id: 2,
      flight_id: 2,
      hotel_id: 1
    })
    Repo.insert!(%BookedTrip{
      destination: "Tokyo",
      start_date: ~D[2018-06-01],
      end_date: ~D[2018-07-01],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 2,
      cost: 2000,
      rooms: 1,
      user_id: 2,
      flight_id: 1,
      hotel_id: 1
    })

    # Long's trips
    Repo.insert!(%BookedTrip{
      destination: "Melbourne",
      start_date: ~D[2016-10-10],
      end_date: ~D[2016-10-20],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 3,
      cost: 3000,
      rooms: 2,
      user_id: 3,
      flight_id: 4,
      hotel_id: 4
    })
    Repo.insert!(%BookedTrip{
      destination: "Seoul",
      start_date: ~D[2018-04-20],
      end_date: ~D[2018-04-30],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 2,
      cost: 3000,
      rooms: 1,
      user_id: 3,
      flight_id: 1,
      hotel_id: 1
    })
    Repo.insert!(%BookedTrip{
      destination: "Tokyo",
      start_date: ~D[2018-06-01],
      end_date: ~D[2018-07-01],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 1,
      cost: 2000,
      rooms: 0,
      user_id: 3,
      flight_id: 4
    })

    # Will's trips
    Repo.insert!(%BookedTrip{
      destination: "Melbourne",
      start_date: ~D[2016-10-10],
      end_date: ~D[2016-10-20],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 5,
      cost: 3000,
      rooms: 5,
      user_id: 4,
      flight_id: 4,
      hotel_id: 3
    })
    Repo.insert!(%BookedTrip{
      destination: "Seoul",
      start_date: ~D[2018-04-20],
      end_date: ~D[2018-04-30],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 2,
      cost: 3000,
      rooms: 0,
      user_id: 4,
      flight_id: 1
    })
    Repo.insert!(%BookedTrip{
      destination: "Tokyo",
      start_date: ~D[2018-06-01],
      end_date: ~D[2018-07-01],
      departure_time: ~T[06:00:00],
      arrival_time: ~T[14:00:00],
      passengers: 4,
      cost: 2000,
      rooms: 2,
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
