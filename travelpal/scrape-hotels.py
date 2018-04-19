#!/usr/bin/python3

import argparse
import uuid

from collections import OrderedDict
from requests import get
from bs4 import BeautifulSoup
import html5lib

import psycopg2
import datetime


parser = argparse.ArgumentParser(description='parse destination input')
parser.add_argument('--dest', action="store", dest='destination')
parser.add_argument('--store', action="store", dest='shouldStore', default=0)

results = parser.parse_args()
destination = results.destination
# 1 = store parsed data
shouldStoreResults = results.shouldStore

# exit if no argument given
if destination is None:
  print("Please enter a desination by adding -dest 'some destination' when running the script")
  exit()

url = 'https://www.booking.com/searchresults.html?'
head = {"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36"}

# use orderedDict to keep order of query parameters
params = OrderedDict()

params['lang'] = 'en-gb'
params['sid'] = uuid.uuid4()
params['src'] = 'index'
params['src-elem'] = 'sb'
params['ss'] = destination
params['checkin_monthday'] = 20
params['checkin_month'] = 6
params['checkin_year'] = 2018
params['checkout_monthday'] = 25
params['checkout_month'] = 6
params['checkout_year'] = 2018
params['group_adults'] = 2
params['group_children'] = 0
params['no_rooms'] = 1
params['from_sf'] = 1
params['dest_id'] = ''
params['dest_type'] = ''

response = get(url, headers=head, params=params)
print(response.status_code)

if(response.status_code != 200):
    print("Bad response")
    exit()

# parse response into bs object
html_soup = BeautifulSoup(response.text, "html5lib")

listing = html_soup.find_all(class_='sr_item')
hotel_list = []
base_url = "https://www.booking.com/"

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
    price = float(price[price.find('$') + 1:].replace(',', ''))
    link = link.attrs['href']
    rating = float(rating.text.lstrip().rstrip()) if rating else None        
    image_src = image['src']    

    hotel_info = (name, district, price, base_url + link, rating, destination, image_src, datetime.datetime.utcnow(), datetime.datetime.utcnow()) 
    hotel_list.append(hotel_info)


for hotel in hotel_list:
    print(hotel[0], hotel[5])

print("Retrieved information of " + str(len(hotel_list)) + " hotels")

if len(hotel_list) > 0 and shouldStoreResults != 0:
    commits = 0
    try:
        conn = psycopg2.connect(host="localhost",database="travelpal_dev", user="travelpal", password="Tei8ooQuo0tu")
        cur = conn.cursor()
        
        for hotel in hotel_list: 
            cur.execute("""INSERT INTO hotels (name, district, price, link, rating, result_from, image_src, inserted_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);""", hotel)  
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
