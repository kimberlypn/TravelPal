defmodule Travelpal.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Travelpal.Friends.Friend

  schema "users" do
    field :email, :string
    field :name, :string
    field :username, :string
    field :budget, :integer
    field :password_hash, :string
    field :password, :string, virtual: true

    has_many :requestor_requests, Friend, foreign_key: :requestor_id
    has_many :acceptor_accepts, Friend, foreign_key: :acceptor_id
    has_many :requestors, through: [:acceptor_accepts, :requestor]
    has_many :acceptors, through: [:requestor_requests, :acceptor]

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name, :username, :budget, :password])
    |> validate_password(:password)
    |> put_pass_hash()
    |> validate_required([:email, :name, :username, :budget, :password_hash])
    # Regex taken from: https://gist.github.com/mgamini/4f3a8bc55bdcc96be2c6
    |> validate_format(:email, ~r/^[A-Za-z0-9._%+-+']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
    # Check that username and email are unique (case insensitive)
    |> update_change(:email, &String.downcase/1)
    |> unique_constraint(:email)
    |> update_change(:username, &String.downcase/1)
    |> unique_constraint(:username)
  end

  # Password validation; taken from Nat's lecture notes
  # From Comeonin docs
  def validate_password(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, password ->
      case valid_password?(password) do
        {:ok, _} -> []
        {:error, msg} -> [{field, options[:message] || msg}]
      end
    end)
  end

  def put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Comeonin.Argon2.add_hash(password))
  end

  def put_pass_hash(changeset), do: changeset

  def valid_password?(password) when byte_size(password) > 7 do
    {:ok, password}
  end

  def valid_password?(_), do: {:error, "The password is too short"}
end
