import pandas as pd
import numpy as np
data_interator = pd.read_csv("./clean_data.csv",names=["route","feels_like","humidity","wind_speed","Rain","Snow","Clear","date","ACTUALTIME_ARR_y"],sep=",",chunksize = 100000)
for df in data_interator:
    df_group = df.groupby(['route'])
    df_group_index = df_group.size().index.tolist()
    for g in df_group_index:
        data = df_group.get_group(g)
        data.to_csv('./data_clean_2/{}.csv'.format(g), mode='a', sep=',', header=False, index=False)
    print("end")
