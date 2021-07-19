from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import SGDRegressor
from sklearn.metrics import mean_absolute_error
import pandas as pd
from pymysql import connect
import re
import numpy as np
from datetime import date
import math
class travel_time(object):
    def __init__(self,stops_number,route_number,start_stop):
        self.stops_number = stops_number
        self.route_number = route_number
        self.start_stop = start_stop
    def get_sql_info(self):
        #weather
        conn = connect(host="173.82.208.22", port=3306, user="root", password="4TheWin!", database="project", 
                                    charset="utf8")
        cs = conn.cursor()
        cs.execute("SELECT * FROM project.realtime_weather_data;")
        weather_data = cs.fetchone()
        result = re.match(r"(.*-.*-.*) .*",weather_data[0])
        result = result.group(1)
        result = result.split("-")
        y = int(result[0])
        m = int(result[1])
        d = int(result[2])
        week_day = date(y,m,d)
        week_day = week_day.weekday() + 1
        tem = round(weather_data[1] - 2 * (math.sqrt(weather_data[3])),2)
        hum = weather_data[2]
        wind = weather_data[3]
        rain = 0
        snow = 0
        if "rain" in weather_data[4]:
            rain = 1
        if "snow" in weather_data[4]:
            snow = 1
        li = [tem,hum,wind,rain,snow,week_day]

        #stops
        self.start_stop = re.match(r".*stop (.*)",self.start_stop)
        self.start_stop = self.start_stop.group(1)
        print(self.start_stop)
        cs.execute("SELECT StopSequence FROM project.route_by_stops where RouteName={} and PlateCode={} and Direction = 'O';".format(str(self.route_number),str(self.start_stop)))
        sequence_data = cs.fetchone()
        sequence_data = sequence_data[0]
        print(sequence_data)
        l_stops = []
        self.stops_number = int(self.stops_number)
        for s in range(0,self.stops_number):
            sequence_data = sequence_data + 1
            cs.execute("SELECT PlateCode FROM project.route_by_stops where StopSequence={} and RouteName={};".format(sequence_data,self.route_number))
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
    # def get_stops():
    #     l = len(sys.argv)
    #     route_list = []
    #     start = sys.argv[1]
    #     for i in range(2,l):
    #         route_list.append(start + "_" + sys.argv[i])
    #         start =sys.argv[i]
    #     print(route_list)
    #     return route_list
    def machine_learning(self,route,x_li):
        try:
            df = pd.read_csv("/app/core/machine_learn_data/{}.csv".format(route),names=["route","feels_like","humidity","wind_speed","Rain","Snow","Clear","date","ACTUALTIME_ARR_y"],sep=",")
        except Exception as e:
            return 60
        # file_name = df["route"][0]
        df = df.drop(df[df.ACTUALTIME_ARR_y < 0].index)
        df["num"] = 1
        df["diff"] = 272.15
        df["feels_like"] = df["feels_like"] + df["diff"]
        df["date"] =  df["date"] + df["num"]
        x = df[["feels_like","humidity","wind_speed","Rain","Snow","date"]]
        y = df["ACTUALTIME_ARR_y"]
        x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.1)
        std_x = StandardScaler()
        x_train = std_x.fit_transform(x_train)
        #x_test = std_x.transform(x_test)
        x_li = np.array(x_li)
        x_li = pd.DataFrame(x_li)
        #print(x_li)
        #print(x_test)
        x_true = std_x.transform(x_li.values.reshape(1,-1))
        #print(x_true)
        std_y = StandardScaler()
        y_train = std_y.fit_transform(y_train.values.reshape(-1,1))
        sgd = SGDRegressor()
        sgd.fit(x_train,y_train)
        #y_predict = std_y.inverse_transform(sgd.predict(x_test))
        #out = mean_absolute_error(y_test,y_predict)
        #print(out)
        y_pre = std_y.inverse_transform(sgd.predict(x_true))
        print(y_pre)
        return y_pre
    # if __name__ == "__main__":
    #     li = get_sql_info()
    #     route_list = get_stops()
    #     time = 0
    #     for route in route_list:
    #         time = time + machine_learning(route,li)
    #     print(time)
t = travel_time(17,"1","Shanard Avenue, stop 226")
t.get_sql_info()
