defmodule Travelpal.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :name, :string
    field :username, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :username, :name, :password])
    |> validate_password(:password)
    |> put_pass_hash()
    |> validate_required([:email, :username, :name, :password_hash])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end

  def put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{pass: password}} = changeset) do
    change(changeset, Comeonin.Argon2.add_hash(password))
  end
  def put_pass_hash(changeset), do: changeset

  def validate_password(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, password ->
      case valid_password?(password) do
        {:ok, _} -> []
        {:error, msg} -> [{field, options[:message] || msg}]
      end
    end)
  end

  def valid_password?(password) when byte_size(password) >= 8 do
    {:ok, password}
  end
  def valid_password?(_), do: {:error, "Password is too short. Required to be at least 8 characters."}
end
