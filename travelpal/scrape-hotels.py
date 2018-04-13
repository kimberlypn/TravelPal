from requests import get
from bs4 import BeautifulSoup
import html5lib


url = 'https://www.booking.com/searchresults.html?label=gen173nr-1FCAEoggJCAlhYSDNYBHIFdXNfbWGIAQGYATHCAQN4MTHIAQzYAQHoAQH4AQKSAgF5qAID;sid=00e247fa4231bdeb9d723c9afc1f8aa7;checkin_month=4&checkin_monthday=20&checkin_year=2018&checkout_month=4&checkout_monthday=21&checkout_year=2018&class_interval=1&dest_id=-2637882&dest_type=city&dtdisc=0&from_sf=1&genius_rate=1&group_adults=2&group_children=0&inac=0&index_postcard=0&label_click=undef&no_rooms=1&offset=0&postcard=0&raw_dest_type=city&room1=A%2CA&sb_price_type=total&src=index&src_elem=sb&ss=Taipei&ss_all=0&ssb=empty&sshis=0&ssne=Taipei&ssne_untouched=Taipei&'

head = {"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36"}

response = get(url, headers=head)

print(response.status_code)

#f = open('scraped-results.txt','w')
#f.write(response.text)
#f.close()

# parse response into bs object
html_soup = BeautifulSoup(response.text, "html5lib")

listing = html_soup.find_all(class_='sr_item')
hotel_list = {}

for hotel in listing:
  name = hotel.select_one("span.sr-hotel__name")
  price = hotel.select_one(".price")

  if name and price:
    name = name.text.strip()
    price = price.text.strip()
    price = price[price.find('$') + 1:] 
    hotel_list[name] = int(price)
 

for name, price in hotel_list.items():
  print(name)
  print(price)
  print("------")


print("Retrieved information of " + str(len(hotel_list)) + " hotels")
