#!/usr/bin/python3

import argparse

from collections import OrderedDict
from requests import get
from bs4 import BeautifulSoup
import html5lib

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

'''
params['class_interval'] = 1
params['dest_type'] = 'city'
params['genius_rate'] = 1
params['group_children'] = 0
params['label_click'] = 'undef'
params['offset'] = 0
params['raw_dest_type'] = 'city'
params['room1'] = 'A,A'
params['sb_price_type'] = 'total'
params['ssb'] = 'empty'
params['ssne'] = destination
params['ssne_untouched'] = destination
params['sid'] = '129654e8254415d360a1922d47c7ccf7'
params['sb'] = 1
params['src'] = 'searchresults'
params['checkin_month'] = 4
params['checkout_year'] = 2018
params['no_rooms'] = 1
params['from_sf'] = 1
params['user_changed_date'] = 1
'''


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
  price = hotel.select_one(".price")
  link = hotel.select_one(".hotel_name_link")
  rating = hotel.select_one(".review-score-badge")  

  if name and price:
    name = name.text.strip()
    
    # all prices in us currency
    price = price.text.strip()
    price = price[price.find('$') + 1:]
    link = link.attrs['href']
    rating = rating.text if rating else "No rating available"    
    
    hotel_info = {} 
    hotel_info["name"] = name
    hotel_info["price"] = price
    hotel_info["link"] = base_url + link
    hotel_info["rating"] = rating
    
    hotel_list.append(hotel_info)

for hotel in hotel_list:
  print("Name: ", hotel["name"])
  print("Price: $", hotel["price"])
  print("Rating: ", hotel["rating"])
  print("Link: ", hotel["link"])
  print("- - - - - - - - - - - - - -")


print("Retrieved information of " + str(len(hotel_list)) + " hotels")
