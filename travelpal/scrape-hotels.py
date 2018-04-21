#!/usr/bin/python3

import argparse
import uuid

from collections import OrderedDict
from requests import get
from bs4 import BeautifulSoup
import html5lib

import psycopg2
from datetime import datetime as dt

parser = argparse.ArgumentParser(description='parse destination input')
parser.add_argument('--dest', dest='destination')
parser.add_argument('--store', dest='should_store', default=0)
parser.add_argument('--sdate', dest='start_date')
parser.add_argument('--edate', dest='end_date')

results = parser.parse_args()
destination = results.destination
should_store_results = results.should_store
start_date = results.start_date
end_date = results.end_date

if destination is None or start_date is None or end_date is None:
  print("Missing arguments, --dest, --sdate, --edate, required")
  exit()

def validate_date(date_text):
    try:
        dt.strptime(date_text, '%Y-%m-%d')
    except ValueError:
        raise ValueError("Malformed date, should be yyyy-mm-dd format.") 
    
validate_date(start_date)
validate_date(end_date)

sdate = dt.strptime(start_date, '%Y-%m-%d')
edate = dt.strptime(end_date, '%Y-%m-%d')
if sdate > edate: 
  print("Start date cannot be after end date!")
  exit()


delta = edate - sdate
days = delta.days

start_date_args = start_date.split("-")
end_date_args = end_date.split("-")

base_url = "https://www.booking.com/"
head = {"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36"}

# use orderedDict to keep order of query parameters
params = OrderedDict()

params['lang'] = 'en-gb'
params['sid'] = uuid.uuid4()
params['src'] = 'index'
params['src-elem'] = 'sb'
params['ss'] = destination
params['checkin_monthday'] = start_date_args[2] 
params['checkin_month'] = start_date_args[1]
params['checkin_year'] = start_date_args[0]
params['checkout_monthday'] = end_date_args[2]
params['checkout_month'] = end_date_args[1]
params['checkout_year'] = end_date_args[0]
params['group_adults'] = 2
params['group_children'] = 0
params['no_rooms'] = 1
params['from_sf'] = 1
params['dest_id'] = ''
params['dest_type'] = ''
# params['order'] = 'review_score_and_price'
params['order'] = 'price'

response = get(base_url + 'searchresults.html?', headers=head, params=params)
print(response.status_code)

if(response.status_code != 200):
    print("Bad response")
    exit()

html_soup = BeautifulSoup(response.text, "html5lib")

listing = html_soup.find_all(class_='sr_item')
hotel_list = []

for hotel in listing:
  name = hotel.select_one("span.sr-hotel__name")
  district = hotel.select_one(".district_link")
  price = hotel.select_one(".price")
  link = hotel.select_one(".hotel_name_link")
  rating = hotel.select_one(".review-score-badge") 
  image = hotel.select_one(".hotel_image") 

  if name and price:
    name = name.text.strip()
    district = district.text.strip() if district else ""    
    district = district[0: district.find("Show") - 2].rstrip()
    
    # all prices in us currency
    price = price.text.strip()
    price = float(price[price.find('$') + 1:].replace(',', '')) / days
    link = link.attrs['href']
    rating = float(rating.text.lstrip().rstrip()) if rating else None        
    image_src = image['src']    

    hotel_info = (name, district, price, base_url + link, rating, image_src, destination, dt.utcnow(), dt.utcnow()) 
    hotel_list.append(hotel_info)

print("Retrieved information of " + str(len(hotel_list)) + " hotels")

if len(hotel_list) > 0 and should_store_results != 0:
    commits = 0
    try:
        conn = psycopg2.connect(host="localhost",database="travelpal_dev", user="travelpal", password="Tei8ooQuo0tu")
        cur = conn.cursor()
        
        for hotel in hotel_list: 
            cur.execute("""INSERT INTO hotels (name, district, price, link, rating, image_src, result_from, inserted_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);""", hotel)  
            if (cur.rowcount == 1):
                conn.commit()
                commits += 1 
        
        # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print(str(commits) + " commits have been made.")
            print('Database connection closed.')
