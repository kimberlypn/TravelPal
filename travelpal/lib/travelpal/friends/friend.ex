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
    |> validate_requestor_acceptor()
    |> validate_status()
  end

  defp validate_requestor_acceptor(changeset) do
    requestor_id = get_field(changeset, :requestor_id)
    acceptor_id = get_field(changeset, :acceptor_id)

    valid_ids?(changeset, requestor_id, acceptor_id)
  end

  defp validate_status(changeset) do
    status = get_field(changeset, :status)

    if (status == "Pending" or status == "Accepted") do
      changeset
    else
      {:error, "Invalid status!"}
    end
  end

  defp valid_ids?(changeset, requestor_id, acceptor_id) when requestor_id != acceptor_id, do: changeset
  defp valid_ids?(changeset, _, _), do: {:error, "Requestor ID cannot be equal to Acceptor ID!"}
end
