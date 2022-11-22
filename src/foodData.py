from bs4 import BeautifulSoup
import pandas as pd
import requests

#한글 깨짐 현상...

base_url = "https://sobi.chonbuk.ac.kr/menu/week_menu.php"
con = requests.get(base_url)
con.encoding='utf-8'
soup = BeautifulSoup(con.content, 'lxml')

infoTable = soup.find("table",{"class":"tblType03"})
infoPrint =[]

for a in infoTable.find_all("tr"):
    infolist = []
    for b in a.find_all("td"):
        info = b.get_text()
        infolist.append(info)
    infoPrint.append(infolist)
    
print(infoPrint[1])