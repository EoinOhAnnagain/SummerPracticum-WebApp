import pandas as pd
import datetime
data_interator = pd.read_csv("./test1.txt",sep=";",chunksize = 10)
for data_chunk in data_interator:
    df = pd.read_csv("./test1.txt",sep=";")
    df = df[["TRIPID","PROGRNUMBER","STOPPOINTID","ACTUALTIME_ARR","DAYOFSERVICE"]]
    df = df.dropna(axis=0,how='any')
    df_date = df[["TRIPID","PROGRNUMBER"]]
    df_date["date"]= df["DAYOFSERVICE"]
    df_date = df_date.sort_values(by=["TRIPID","PROGRNUMBER"])
    df_date["date"] = df_date["date"].astype(str)
    df_date["date"] = df_date["date"].apply(lambda x:datetime.datetime.strptime(x,'%d-%b-%y %H:%M:%S'))
    df_date["date"] = df_date["date"].dt.date
    df_date["date"] = df_date["date"].astype(str)
    df_weather = pd.read_csv("./weather_1.txt",sep=",")
    df_cross = pd.crosstab(df_weather["dt_iso"],df_weather["weather_main"])
    df_weather = df_weather[["dt_iso","feels_like","humidity","wind_speed"]]
    df_weather = pd.merge(df_weather,df_cross,on="dt_iso")
    df_weather.rename(columns={"dt_iso":"date"}, inplace=True)
    df_weather["date"] = df_weather["date"].astype(str)
    df_weather["date"] = df_weather["date"].apply(lambda x:datetime.datetime.strptime(x,'%Y-%m-%d'))
    df_weather["date"] = df_weather["date"].astype(str)
    df_date = pd.merge(df_date, df_weather, how='left', on="date")
    df_date["date"] = df_date["date"].apply(lambda x:datetime.datetime.strptime(x,'%Y-%m-%d'))
    l = len(df_date["date"])
    for i in range(0,l):
        df_date["date"][i] = df_date["date"][i].weekday()
    # print(df_date)
    df_date['index'] = df_date.index
    df_date_cross = pd.crosstab(df_date["index"],df_date["date"])
    df_date = pd.merge(df_date,df_date_cross,left_index=True,right_index=True)
    df_date = df_date[["feels_like","humidity","wind_speed","Rain","Snow","Clear",0,1,2,3,4,5,6]]
    df = df.sort_values(by=["TRIPID","PROGRNUMBER"])
    df_diff = df[["PROGRNUMBER","ACTUALTIME_ARR"]].diff()
    df_diff.fillna(0,inplace=True)
    df_cloumn = df[["STOPPOINTID"]]
    df_cloumn = df_cloumn[1:]
    df = df.reset_index(drop=True)
    # print(df)
    df_cloumn = df_cloumn.reset_index(drop=True)
    df_diff = df_diff.reset_index(drop=True)
    df = pd.merge(df,df_cloumn,left_index=True,right_index=True)
    df = pd.merge(df,df_diff,left_index=True,right_index=True)
    df_merge = pd.DataFrame()
    df_merge["route"] = df["STOPPOINTID_x"] + df["STOPPOINTID_y"]
    df = df[["TRIPID","PROGRNUMBER_y","ACTUALTIME_ARR_y"]]
    df["route"] = df_merge["route"]
    df_total = pd.merge(df,df_cloumn,left_index=True,right_index=True)
    df_total = pd.merge(df_total,df_date,left_index=True,right_index=True)
    df_total = df_total.drop(df_total[df_total.PROGRNUMBER_y != 1.0].index)
    df_total = df_total.drop(df_total[df_total.ACTUALTIME_ARR_y > 1000.0].index)
    df_total = df_total.drop(df_total[df_total.ACTUALTIME_ARR_y < -1000.0].index)
    df_total.reset_index(inplace=True,drop=True)
    df_total = df_total[["route","feels_like","humidity","wind_speed","Rain","Snow","Clear",0,1,2,3,4,5,6,"ACTUALTIME_ARR_y"]]
    df_total.to_csv('./clean_data.csv', sep=',', header=True, index=True)

    # df_total = df_total.dropna(inplace=True)
