import requests
from lxml import etree
class fare_crawler(object):
    def __init__(self,number,stop):
        self.number = number.lower()
        self.direction = "O"
        self.start = 0
        self.stop = stop
        self.headers={
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
            }
        self.url = "https://www.dublinbus.ie/Fare-Calculator/Fare-Calculator-Results/?routeNumber={}&direction={}&board={}&alight={}".format(self.number,self.direction,self.start,self.stop)
    def parse(self):
        try:
            response = requests.get(self.url, headers=self.headers)
            html_str = response.content.decode()
            html = etree.HTML(html_str)
            fare = html.xpath("//div[@class='other-fares-display']/table/tbody")
        except Exception as e:
            l = ['AdultCash', 'AdultLeap', 'ChildCash(Under16)', 'ChildLeap(Under19)', 'SchoolHoursCash', 'SchoolHoursLeap', '€3.00', '€2.25', '€1.30', '€1.00', '€1.00', '€0.80']
        l = []
        k = 0
        for d in fare:
            c = d.xpath("//tr/td[1]/text()")
            for i in range(0,len(c)):
                w = "".join(c[i].split())
                if len(w) == 0:
                    continue
                l.append(w)
                print(w)
            p = d.xpath("//tr/td[2]/text()")
            for j in range(0,len(p)):
                w_2 = "".join(p[j].split())
                l.append(w_2)
                print(w_2)
        if len(l) == 0:
             l = ['AdultCash', 'AdultLeap', 'ChildCash(Under16)', 'ChildLeap(Under19)', 'SchoolHoursCash', 'SchoolHoursLeap', '€3.00', '€2.25', '€1.30', '€1.00', '€1.00', '€0.80']
        return l  
# f = fare_crawler(4,10)
# l = f.parse()
# print(l)
