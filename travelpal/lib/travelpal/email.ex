defmodule Travelpal.Email do
  import Bamboo.Email

  # Welcome email to send to new users. Sends to the given email and addresses using the name given.
  def welcome_email(user_email, name) do
    new_email(
      to: user_email,
      from: "support@kimberlynguyen.solutions",
      subject: "Welcome to Travelpal!",
      html_body: "<h2>Welcome #{name}!</h2><p>Your account on Travelpal has successfully been created.</p>",
      text_body: "Your account on Travelpal has successfully been created."
    )
  end
end
