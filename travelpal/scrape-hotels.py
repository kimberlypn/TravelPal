from requests import get
from bs4 import BeautifulSoup
import html5lib


url = 'https://www.booking.com/searchresults.html?label=gen173nr-1FCAEoggJCAlhYSDNYBHIFdXNfbWGIAQGYATHCAQN4MTHIAQzYAQHoAQH4AQKSAgF5qAID&sid=129654e8254415d360a1922d47c7ccf7&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.html%3Flabel%3Dgen173nr-1FCAEoggJCAlhYSDNYBHIFdXNfbWGIAQGYATHCAQN4MTHIAQzYAQHoAQH4AQKSAgF5qAID%3Bsid%3D129654e8254415d360a1922d47c7ccf7%3Bcheckin_monthday%3D20%3Bcheckin_year%3D2018%3Bcheckout_month%3D4%3Bcheckout_monthday%3D21%3Bcheckout_year%3D2018%3Bclass_interval%3D1%3Bdest_id%3D-2637882%3Bdest_type%3Dcity%3Bfrom_sf%3D1%3Bgenius_rate%3D1%3Bgroup_adults%3D2%3Bgroup_children%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Braw_dest_type%3Dcity%3Broom1%3DA%252CA%3Bsb_price_type%3Dtotal%3Bsrc%3Dindex%3Bsrc_elem%3Dsb%3Bss%3DTaipei%3Bssb%3Dempty%3Bssne%3DTaipei%3Bssne_untouched%3DTaipei%26%3B&ss=Taipei&ssne=Taipei&ssne_untouched=Taipei&city=-2637882&checkin_month=4&checkin_monthday=19&checkin_year=2018&checkout_month=4&checkout_monthday=20&checkout_year=2018&group_adults=2&group_children=0&no_rooms=1&from_sf=1&user_changed_date=1'

response = get(url)

print(response.status_code)
#print(response.text)

f = open('scraped-results.txt','w')
f.write(response.text)
f.close()

# parse response into bs object
html_soup = BeautifulSoup(response.text, "html5lib")

hotel_names = html_soup.find_all(class_='sr-hotel__name')
print(len(hotel_names))

prices = html_soup.find_all(class_='availprice')
print(len(prices))

for name in hotel_names: 
  print(name)

for price in prices:
  print(price)
