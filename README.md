# TravelPal

**Collaborators**: Kimberly Nguyen, Longsheng Lin, Matt Dang, William Guo

**TravelPal**: http://travelpal.kimberlynguyen.solutions 

**Course Website**: http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/ 

## Introduction 
TravelPal is a social flights application that allows users to search for and 
book flights and hotels, maintain a diary of past trips, and keep up with their 
friends’ travels. The application aims to serve as a platform for travelers on 
a budget and to provide a smooth trip-planning experience. 

## Getting Started
When users first visit the home page, they will be prompted with a log-in form. 
![index page](screenshots/log-in-form.png) 

If users do not have an account, they can use the registration link below the 
log-in form to create one. This link will redirect them to a registration form. 
![registration form](screenshots/registration-form.png) 

## Home Page
After logging in, users will be redirected to the "Home" page where they can see 
their social feed. The "Friends' Trips" section displays all of the booked trips 
of the user's friends. 
![home page friends' trips](screenshots/friends-trips.png) 

Below this section is a "Popular Flights" section, where the application 
recommends potential trips based on the user's budget. Users can click the 
"Book" button in the bottom-right of a flight card in order to start the 
booking process. 
![home page popular flights](screenshots/popular-flights.png) 

## Search Page 
When first clicked, the "Search" page will display a form, where users can enter 
in details about the flight for which they would like to search. 
![search form](screenshots/search-form.png) 

After clicking "Submit" in the bottom-right of the form, or if the user clicked 
the "Book" button of a flight card from the "Home" or the "Search" button of a 
travel date card from the "Travel Dates" pages, the application will display all 
of the flights that it found that matched the user's preferences. 
![search page flights found](screenshots/flights-found.png) 

If no flights have been found, then the application will display a "No Flights 
Available" message. 
![search page no flights available](screenshots/no-flights-available.png) 

Users can start a new search by clicking the "New Search" button in the 
top-right, which will redisplay the search form. Or, if they have found a 
satisfactory flight, then they can click the "Book" button in the bottom-right 
of the flight card. The application will then list hotels near the searched 
destination. Users can skip this step by clicking the "Skip Hotel Booking" 
button in the top-right. 
![search page hotels found](screenshots/hotels-found.png) 

After successfully booking a flight, a message will be displayed telling users 
what to do next. 
![successfully booked](screenshots/successfully-booked.png) 

