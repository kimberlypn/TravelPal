defmodule Travelpal.Follows.Follow do
  use Ecto.Schema
  import Ecto.Changeset

  alias Travelpal.Follows.Follow
  alias Travelpal.Users.User

  schema "follows" do
    belongs_to :follower, User
    belongs_to :followee, User

    timestamps()
  end

  @doc false
  def changeset(%Follow{} = follow, attrs) do
    follow
    |> cast(attrs, [:follower_id, :followee_id])
    |> validate_required([:follower_id, :followee_id])
  end
end
