import requests
import json
from pymysql import connect
import pytz
import datetime
class Bus:
    def __init__(self):
        self.headers = {
        'Cache-Control': 'no-cache',
        'x-api-key': 'ec34d8b339984fcab63628f2e2e1baa5',
        }
        self.url = "https://api.nationaltransport.ie/gtfsrtest/?format=json"
    def parse_url(self):
        response = requests.get(self.url, headers=self.headers)
        content = json.loads(response.text)
        print(content)
        self.save_data(content)
    def save_data(self,content):
        conn = connect(host="173.82.208.22", port=3306, user="root", password="4TheWin!", database="project",
                            charset="utf8")
        cs = conn.cursor()
        k = len(content["entity"]) - 1
        print(k)
        cs.execute("TRUNCATE realtime_bus_data")
        # ie = pytz.country_timezones('ie')
        tz = pytz.timezone('Eire')
        dtime = datetime.datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")
        dtime = "\"" + dtime + "\""
        for i in range(0,k):
            try:
                l = len(content["entity"][i]["trip_update"]["stop_time_update"])-1
                value = "insert into realtime_bus_data values("
                value += str(i)
                value += ","
                value += str(dtime)
                value += ","
                value += "\"" + str(content["entity"][i]["id"]) + "\""
                value += ","
                value += "\"" + str(content["entity"][i]["trip_update"]["trip"]["trip_id"]) + "\""
                value += ","
                value += "\"" + str(content["entity"][i]["trip_update"]["trip"]["start_time"]) + "\""
                value += ","
                value += "\"" + str(content["entity"][i]["trip_update"]["trip"]["start_date"]) + "\""
                value += ","
                value += "\"" + str(content["entity"][i]["trip_update"]["trip"]["route_id"]) + "\""
                value += ","
                value += str(content["entity"][i]["trip_update"]["stop_time_update"][l]["stop_sequence"])    
                value += ","
                try:
                    value += str(content["entity"][i]["trip_update"]["stop_time_update"][l]["arrival"]["delay"])    
                except Exception as e:
                    value += str(0)
                value += ","
                try:
                    value += str(content["entity"][i]["trip_update"]["stop_time_update"][l]["departure"]["delay"])
                except Exception as e:
                    value += str(0)  
                value += ","
                value += "\"" + str(content["entity"][i]["trip_update"]["stop_time_update"][l]["stop_id"]) + "\""   
                value += ");"
                print(value)
            except Exception as e:
                print("error")
                print(value)
            cs.execute(value)
            conn.commit()
            continue                
        cs.close()
        conn.close()
    def run(self):
        self.parse_url()
b = Bus()
b.parse_url()
