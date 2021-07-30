from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import SGDRegressor
from sklearn.metrics import mean_absolute_error
import pandas as pd
from pymysql import connect
import re
import numpy as np
from datetime import date
import math
import joblib
class cal_travel_time(object):
    def __init__(self,stops_number,route_number,start_stop,journey_date):
        self.stops_number = stops_number
        self.route_number = route_number
        self.start_stop = start_stop
        self.journey_date = journey_date
    def get_sql_info(self):
        #weather
        conn = connect(host="173.82.208.22", port=3306, user="root", password="4TheWin!", database="project", 
                                    charset="utf8")
        cs = conn.cursor()
        cs.execute("SELECT * FROM project.realtime_weather_data where dt='{}';".format(self.journey_date))
        weather_data = cs.fetchone()
        print(weather_data[0])
        # result = re.match(r"(.*-.*-.*) .*",weather_data[0])
        result = weather_data[0]
        print(result)
        result = result.split("-")
        y = int(result[0])
        m = int(result[1])
        d = int(result[2])
        week_day = date(y,m,d)
        week_day = week_day.weekday()
        tem = round(weather_data[1] - 272.15 - 2 * (math.sqrt(weather_data[3])),2)
        hum = weather_data[2]
        wind = weather_data[3]
        rain = 0
        snow = 0
        if "rain" in weather_data[4]:
            rain = 1
        if "snow" in weather_data[4]:
            snow = 1
        li = [tem,hum,wind,rain,snow,week_day]
        print(li)

        #stops
        try:
            self.start_stop = re.match(r".*stop (.*)",self.start_stop)
            self.start_stop = self.start_stop.group(1)
            print(self.start_stop)
        except Exception as e:
            self.start_stop = 1
        try:
            cs.execute("SELECT StopSequence FROM project.route_by_stops where RouteName='{}' and PlateCode='{}';".format(str(self.route_number),str(self.start_stop)))
            sequence_data = cs.fetchone()
            sequence_data = sequence_data[0]
        except Exception as e:
            sequence_data = 1
        print(sequence_data)
        l_stops = []
        self.stops_number = int(self.stops_number)
        for s in range(0,self.stops_number):
            sequence_data = sequence_data + 1
            cs.execute("SELECT PlateCode FROM project.route_by_stops where StopSequence='{}' and RouteName='{}';".format(sequence_data,str(self.route_number)))
            stop_name = cs.fetchone()
            stop_name = stop_name[0]
            l_stops.append(stop_name)
        l = len(l_stops)
        start = l_stops[0]
        route_list = []
        for n in range(1,l):
            route_list.append(start + "_" + l_stops[n])
            start = l_stops[n]
        print(route_list)
        conn.commit()
        cs.close()
        conn.close()
        total_time = 0
        for route in route_list:
            time = self.machine_learning(route,li)
            total_time = total_time + time
        print(total_time)
        return total_time
    def machine_learning(self,route,x_li):
        try:
            estimator = joblib.load("dublin_bus_app/app/core/model/{}.pkl".format(route))
        except Exception as e:
            return 60
        std = MinMaxScaler(feature_range=(0,1))
        x_li = np.array(x_li)
        x_li = pd.DataFrame(x_li)
        x_li = std.fit_transform(x_li.values.reshape(1,-1))
        y_pre = estimator.predict(x_li)
        return y_pre
t = cal_travel_time(17,"1","Shanard Avenue, stop 226","2021-07-30")
t.get_sql_info()
