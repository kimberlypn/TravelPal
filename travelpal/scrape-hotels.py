#!/usr/bin/python3

import argparse

from collections import OrderedDict
from requests import get
from bs4 import BeautifulSoup
import html5lib

import psycopg2

def connect():
    try:
        conn = psycopg2.connect(host="localhost",database="travelpal_dev", user="travelpal", password="Tei8ooQuo0tu")
        cur = conn.cursor()
        
 	# execute a statement
       	print('PostgreSQL database version:')
        cur.execute('SELECT * FROM users') 
        # display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)
       
        # close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')


connect()
exit()
'''
Example of query parameters
{

	label:gen173nr-1DCAEoggJCAlhYSDNYBHIFdXNfbWGIAQGYAS7CAQN4MTHIAQzYAQPoAQGSAgF5qAID
	lang:en-gb
	sid:7bd01355e93b5fc50b6943e46ac9561a
	sb:1
	src:index
	src_elem:sb
       error_url:https://www.booking.com/index.en-gb.html?label=gen173nr-1DCAEoggJCAlhYSDNYBHIFdXNfbWGIAQGYAS7CAQN4MTHIAQzYAQPoAQGSAgF5qAID;sid=7bd01355e93b5fc50b6943e46ac9561a;sb_price_type=total&;
	ss:taipei
	checkin_monthday:20
	checkin_month:4
	checkin_year:2018
	checkout_monthday:21
	checkout_month:4
	checkout_year:2018
	group_adults:2
	group_children:0
	no_rooms:1
	from_sf:1
	ss_raw:taipei
	dest_id:
	dest_type:
	search_pageview_id:32b99f02f087023e
	search_selected:false

}
'''


parser = argparse.ArgumentParser(description='parse destination input')
parser.add_argument('-dest', action="store", dest='destination')

results = parser.parse_args()
destination = results.destination


# exit if no argument given
if destination is None:
  print("Please enter a desination by adding -dest 'some destination' when running the script")
  exit()

#url = 'https://www.booking.com/searchresults.html?label=gen173nr-1FCAEoggJCAlhYSDNYBHIFdXNfbWGIAQGYATHCAQN4MTHIAQzYAQHoAQH4AQKSAgF5qAID;sid=00e247fa4231bdeb9d723c9afc1f8aa7;checkin_month=4&checkin_monthday=20&checkin_year=2018&checkout_month=4&checkout_monthday=21&checkout_year=2018&class_interval=1&dest_id=-2637882&dest_type=city&dtdisc=0&from_sf=1&genius_rate=1&group_adults=2&group_children=0&inac=0&index_postcard=0&label_click=undef&no_rooms=1&offset=0&postcard=0&raw_dest_type=city&room1=A%2CA&sb_price_type=total&src=index&src_elem=sb&ss=Taipei&ss_all=0&ssb=empty&sshis=0&ssne=Taipei&ssne_untouched=Taipei&'

url = 'https://www.booking.com/searchresults.html?'
head = {"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36"}

# use orderedDict to keep order of query parameters
params = OrderedDict()

params['label'] = 'gen173nr-1DCAEoggJCAlhYSDNYBHIFdXNfbWGIAQGYAS7CAQN4MTHIAQzYAQPoAQGSAgF5qAID' 
params['lang'] = 'en-gb'
params['sid'] = '7bd01355e93b5fc50b6943e46ac9561a'
params['src'] = 'index'
params['src-elem'] = 'sb'
params['ss'] = destination
params['checkin_monthday'] = 20
params['checkin_month'] = 4
params['checkin_year'] = 2018
params['checkout_monthday'] = 21
params['checkout_month'] = 4
params['checkout_year'] = 2018
params['group_adults'] = 2
params['group_children'] = 0
params['no_rooms'] = 1
params['from_sf'] = 1
params['ss_raw'] = 'taipei'
params['dest_id'] = ''
params['dest_type'] = ''


response = get(url, headers=head, params=params)


print(response.status_code)
print(response.url)
#print(response.text)


#f = open('scraped-results.txt','w')
#f.write(response.text)
#f.close()

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

  if name and price:
    name = name.text.strip()
    district = district.text.strip() if district else ""    
    district = district[0: district.find("Show") - 2].rstrip()
    
    # all prices in us currency
    price = price.text.strip()
    price = price[price.find('$') + 1:]
    link = link.attrs['href']
    rating = rating.text.lstrip().rstrip() if rating else "Unrated"    
    
    print(rating)   
 
    hotel_info = {} 
    hotel_info["name"] = name 
    hotel_info["district"] = district
    hotel_info["price"] = price
    hotel_info["link"] = base_url + link
    hotel_info["rating"] = rating
    
    hotel_list.append(hotel_info)

for hotel in hotel_list:
  print("Name: ", hotel["name"])
  print("District: ", hotel["district"])
  print("Price: $", hotel["price"])
  print("Rating: ", hotel["rating"])
  print("Link: ", hotel["link"])
  print("- - - - - - - - - - - - - -")


print("Retrieved information of " + str(len(hotel_list)) + " hotels")
