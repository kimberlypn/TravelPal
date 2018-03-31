# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :travelpal,
  ecto_repos: [Travelpal.Repo]

# Configures the endpoint
config :travelpal, TravelpalWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "+CQdUZ4q3Jt6/vdQLXpIyZmq5qOrUXPqbDd3ge7qVweIAQhbllBfrDLJsUk3WLgI",
  render_errors: [view: TravelpalWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Travelpal.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
