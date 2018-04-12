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

  def run do
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

    Repo.delete_all(Friend)
    Repo.insert!(%Friend{requestor_id: 1, acceptor_id: 2, status: "Accepted"})
    Repo.insert!(%Friend{requestor_id: 3, acceptor_id: 2, status: "Pending"})
    Repo.insert!(%Friend{requestor_id: 4, acceptor_id: 2, status: "Accepted"})

    Repo.delete_all(TravelDate)
    Repo.insert!(%TravelDate{
      destination: "Honolulu",
      end_date: ~D[2017-01-20],
      price_limit: 1500.0,
      start_date: ~D[2017-01-01],
      user_id: 2
    })
    Repo.insert!(%TravelDate{
      destination: "Rome",
      end_date: ~D[2018-04-25],
      price_limit: 1000.0,
      start_date: ~D[2018-04-19],
      user_id: 2
    })
    Repo.insert!(%TravelDate{
      destination: "Tokyo",
      end_date: ~D[2018-07-01],
      price_limit: 2000.0,
      start_date: ~D[2018-06-01],
      user_id: 2
    })
    Repo.insert!(%TravelDate{
      destination: "Melbourne",
      end_date: ~D[2018-05-30],
      price_limit: 3000.0,
      start_date: ~D[2018-05-01],
      user_id: 1
    })
    Repo.insert!(%TravelDate{
      destination: "Barcelona",
      end_date: ~D[2018-08-20],
      price_limit: 2000.0,
      start_date: ~D[2018-08-15],
      user_id: 3
    })
    Repo.insert!(%TravelDate{
      destination: "London",
      end_date: ~D[2018-08-04],
      price_limit: 1000.0,
      start_date: ~D[2018-07-04],
      user_id: 4
    })
  end

  def seed(:dev) do
    run()
  end

  def seed(:prod) do
    # run()
  end
end

Seeds.seed(Mix.env)
