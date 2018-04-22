defmodule Travelpal.Email do
  import Bamboo.Email

  # Welcome email to send to new users. Sends to the given email and addresses using the name given.
  def welcome_email(user_email, name) do
    new_email(
      to: user_email,
      from: "support@travelpal.kimberlynguyen.solutions",
      subject: "Welcome to Travelpal!",
      html_body: "<h2>Welcome #{name}!</h2><p>Your account on Travelpal has successfully been created.</p>",
      text_body: "Your account on Travelpal has successfully been created."
    )
  end

  def updated_account_email(user_email, username) do
    new_email(
      to: user_email,
      from: "support@travelpal.kimberlynguyen.solutions",
      subject: "Travelpal Account Change for #{username}",
      html_body: "<h2>Account Updated</h2><p>Your account on Travelpal has recently been updated.</p>",
      text_body: "Your account on Travelpal has recently been updated."
    )
  end
end
