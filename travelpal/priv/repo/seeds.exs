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
  alias Travelpal.Accounts.User

  def run do
    Repo.delete_all(User)
    pass1 = Comeonin.Argon2.hashpwsalt("mdangpass")
    pass2 = Comeonin.Argon2.hashpwsalt("kimberlypnpass")
    pass3 = Comeonin.Argon2.hashpwsalt("long74100pass")
    pass4 = Comeonin.Argon2.hashpwsalt("Guo-Williampass")

    user1 = Repo.insert!(%User{ email: "matt@example.com", name: "Matt Dang", username: "mdang", password_hash: pass1 })
    user2 = Repo.insert!(%User{ email: "kimberly@example.com", name: "Kimberly Nguyen", username: "kimberlypn", password_hash: pass2 })
    user3 = Repo.insert!(%User{ email: "long@example.com", name: "Long Lin", username: "long74100", password_hash: pass3 })
    user4 = Repo.insert!(%User{ email: "will@example.com", name: "William Guo", username: "Guo-William", password_hash: pass4 })
  end
end

Seeds.run
