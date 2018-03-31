defmodule TravelpalWeb.PageController do
  use TravelpalWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
