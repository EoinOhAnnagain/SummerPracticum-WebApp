import requests
from lxml import etree
class fare_crawler(object):
    def __init__(self,number,direction,start,stop):
        self.number = number
        self.direction = direction
        self.start = start
        self.stop = stop
        self.headers={
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
        }
        self.url = "https://www.dublinbus.ie/Fare-Calculator/Fare-Calculator-Results/?routeNumber={}&direction={}&board={}&alight={}".format(self.number,self.direction,self.start,self.stop)
    def parse(self):
        response = requests.get(self.url, headers=self.headers)
        html_str = response.content.decode()
        html = etree.HTML(html_str)
        fare = html.xpath("//div[@class='other-fares-display']/table/tbody")
        self.details(fare)
        print(fare)
    def details(self,fare):
        k = 0
        for d in fare:
            c = d.xpath("//tr/td[1]/text()")
            for i in range(0,len(c)):
                w = "".join(c[i].split())
                if len(w) == 0:
                    continue
                print(w)
            p = d.xpath("//tr/td[2]/text()")
            for j in range(0,len(p)):
                print("".join(p[j].split()))

f = fare_crawler(1,"O",0,1)
f.parse()
