defmodule Travelpal.Email do
  import Bamboo.Email

  # Welcome email to send to new users. Sends to the given email and addresses using the name given.
  def welcome_email(user_email, name) do
    new_email(
      to: user_email,
      from: "support@travelpal.kimberlynguyen.solutions",
      subject: "Welcome to Travelpal!",
      html_body: "<p>Hi #{name},</p><p>Your account on Travelpal has successfully been created.</p>",
      text_body: "Your account on Travelpal has successfully been created."
    )
  end

  def updated_account_email(user_email, name, username) do
    new_email(
      to: user_email,
      from: "support@travelpal.kimberlynguyen.solutions",
      subject: "Travelpal Account Change Notice for #{username}",
      html_body: "<p>Hi #{name},</p><p>Your account on Travelpal has recently been updated.</p>",
      text_body: "Your account on Travelpal has recently been updated."
    )
  end

  def deleted_account_email(user_email, name, username) do
    new_email(
      to: user_email,
      from: "support@travelpal.kimberlynguyen.solutions",
      subject: "Travelpal Account Deletion Notice for #{username}",
      html_body: "<p>Hi #{name},</p><p>Your account on Travelpal has been successfully deleted.</p>",
      text_body: "Your account on Travelpal has successfully been deleted."
    )
  end
end
