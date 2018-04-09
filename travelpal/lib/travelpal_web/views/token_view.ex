defmodule TravelpalWeb.TokenView do
  use TravelpalWeb, :view

  # Taken from Nat's lecture notes
  def render("token.json", %{user: user, token: token}) do
    %{
      token: token,
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username
    }
  end
end
