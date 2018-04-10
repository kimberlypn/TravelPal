defmodule Travelpal.Friends.Friend do
  use Ecto.Schema
  import Ecto.Changeset

  alias Travelpal.Friends.Friend
  alias Travelpal.Users.User

  schema "friends" do
    field :status, :string
    belongs_to :requestor, User
    belongs_to :acceptor, User

    timestamps()
  end

  @doc false
  def changeset(%Friend{} = friend, attrs) do
    friend
    |> cast(attrs, [:status, :requestor_id, :acceptor_id])
    |> validate_required([:status, :requestor_id, :acceptor_id])
  end
end
