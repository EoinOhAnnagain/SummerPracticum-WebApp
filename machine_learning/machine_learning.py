import pandas as pd
import datetime
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import SGDRegressor
from sklearn.metrics import mean_squared_error
#data analisis and cleaning
df = pd.read_csv("./test1.txt",sep=";")
df = df[["TRIPID","PROGRNUMBER","STOPPOINTID","ACTUALTIME_ARR","DAYOFSERVICE"]]
df = df.dropna(axis=0,how='any')


#Extract date data
df_date = df[["TRIPID","PROGRNUMBER"]]
df_date["date"]= df["DAYOFSERVICE"]
df_date = df_date.sort_values(by=["TRIPID","PROGRNUMBER"])
# print(df_date)
df_date["date"] = df_date["date"].astype(str)
df_date["date"] = df_date["date"].apply(lambda x:datetime.datetime.strptime(x,'%d-%b-%y %H:%M:%S'))
df_date["date"] = df_date["date"].dt.date
df_date["date"] = df_date["date"].astype(str)
# print(df_date)


#Extract weather data into a 0-1 matrix, and then match it with the date
df_weather = pd.read_csv("./2018_historic_weather_3.txt",sep=",")
df_cross = pd.crosstab(df_weather["dt_iso"],df_weather["weather_main"])
df_weather = df_weather[["dt_iso","feels_like","humidity","wind_speed"]]
df_weather = pd.merge(df_weather,df_cross,on="dt_iso")
df_weather.rename(columns={"dt_iso":"date"}, inplace=True)
df_weather["date"] = df_weather["date"].astype(str)
df_weather["date"] = df_weather["date"].apply(lambda x:datetime.datetime.strptime(x,'%Y-%m-%d'))
df_weather["date"] = df_weather["date"].astype(str)
df_date = pd.merge(df_date, df_weather, how='left', on="date")
# print(df_weather)



#convert the day of the week
df_date["date"] = df_date["date"].apply(lambda x:datetime.datetime.strptime(x,'%Y-%m-%d'))
l = len(df_date["date"])
for i in range(0,l):
    df_date["date"][i] = df_date["date"][i].weekday()
df_date['index'] = df_date.index
# print(df_date)


#Form a 0-1 matrix of week data and then match it with the date
df_date_cross = pd.crosstab(df_date["index"],df_date["date"])
df_date = pd.merge(df_date,df_date_cross,left_index=True,right_index=True)
df_date = df_date[["feels_like","humidity","wind_speed","Rain","Snow","Clear",0,1,2,3,4,5,6]]
# print(df_date_cross)
# print(df_date)


#Calculate the time difference between stations
df = df.sort_values(by=["TRIPID","PROGRNUMBER"])
# print(df)
df_diff = df[["PROGRNUMBER","ACTUALTIME_ARR"]].diff()
df_diff.fillna(0,inplace=True)
# print(df)


#Form a list of station sections
df_cloumn = df[["STOPPOINTID"]]
df_cloumn = df_cloumn[1:]
df = df.reset_index(drop=True)
df_cloumn = df_cloumn.reset_index(drop=True)
df_diff = df_diff.reset_index(drop=True)
df = pd.merge(df,df_cloumn,left_index=True,right_index=True)
df = pd.merge(df,df_diff,left_index=True,right_index=True)
# df.STOPPOINTID_x = df.STOPPOINTID_x.astype(str) 
# df.STOPPOINTID_y = df.STOPPOINTID_y.astype(str)
df_merge = pd.DataFrame()
df_merge["route"] = df["STOPPOINTID_x"] + df["STOPPOINTID_y"]
df = df[["TRIPID","PROGRNUMBER_y","ACTUALTIME_ARR_y"]]
df["route"] = df_merge["route"]
# print(df)

#Match all the features, and then perform the final data cleaning
df_total = pd.merge(df,df_cloumn,left_index=True,right_index=True)
df_total = pd.merge(df_total,df_date,left_index=True,right_index=True)
# print(df_total)
df_total = df_total.drop(df_total[df_total.PROGRNUMBER_y != 1.0].index)
df_total = df_total.drop(df_total[df_total.ACTUALTIME_ARR_y > 1000.0].index)
df_total = df_total.drop(df_total[df_total.ACTUALTIME_ARR_y < -1000.0].index)

# df_total = df_total[["route","ACTUALTIME_ARR_y","feels_like","humidity","wind_speed","Rain","Snow","Clear",0,1,2,3,4,5,6]]
df_total.reset_index(inplace=True,drop=True)
# print(df_merge)
# print(df_date)
# print(df)
print(df_total)


#machine leaning
#Split the data set
df_total.dropna(inplace=True)
x = df_total[["route","feels_like","humidity","wind_speed","Rain","Snow","Clear",0,1,2,3,4,5,6]]
y = df_total["ACTUALTIME_ARR_y"]


x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.2)

#Features standardization
std_x = StandardScaler()
x_train = std_x.fit_transform(x_train)
x_test = std_x.transform(x_test)
std_y = StandardScaler()
y_train = std_y.fit_transform(y_train.values.reshape(-1,1))
# print(x_train)
# print(x_test)
# print(y_train)
sgd = SGDRegressor()


sgd.fit(x_train,y_train)
print(sgd.coef_)
y_predict = std_y.inverse_transform(sgd.predict(x_test))
print(y_predict)
print(y_test)
out = mean_squared_error(std_y.inverse_transform(y_test),y_predict)
print(out)
