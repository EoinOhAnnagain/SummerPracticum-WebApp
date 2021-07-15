from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import SGDRegressor
from sklearn.metrics import mean_absolute_error
import pandas as pd
import sys
from pymysql import connect
import re
import numpy as np
from datetime import date
import math
import joblib
def get_sql_info():
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
    conn.commit()
    cs.close()
    conn.close()
    return li
def get_stops():
    l = len(sys.argv)
    route_list = []
    start = sys.argv[1]
    for i in range(2,l):
        route_list.append(start + "_" + sys.argv[i])
        start =sys.argv[i]
    print(route_list)
    return route_list
def machine_learning(route,x_li):
    try:
    	df = pd.read_csv("./machine_learn_data/machine_learn_data/{}.csv".format(route),names=["route","feels_like","humidity","wind_speed","Rain","Snow","Clear","date","ACTUALTIME_ARR_y"],sep=",")
    # file_name = df["route"][0]
    except Exception as e:
        return 60
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
    #print(y_pre)
    return y_pre
if __name__ == "__main__":
    li = get_sql_info()
    route_list = get_stops()
    time = 0
    for route in route_list:
        time = time + machine_learning(route,li)
    print(time)
