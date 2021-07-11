from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import SGDRegressor
from sklearn.metrics import mean_absolute_error
import joblib
import pandas as pd
import os
dir = './machine_learn_data'
lis = os.listdir(dir)
print(lis)  
for i in range(0, len(lis)):
    path = os.path.join(dir,lis[i])
    print(path)
    df = pd.read_csv(path,names=["route","feels_like","humidity","wind_speed","Rain","Snow","Clear","date","ACTUALTIME_ARR_y"],sep=",")
    file_name = df["route"][0]
    df = df.drop(df[df.ACTUALTIME_ARR_y < 0].index)
    x = df[["feels_like","humidity","wind_speed","Rain","Snow","date"]]
    y = df["ACTUALTIME_ARR_y"]
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
    # print(sgd.coef_)
    y_predict = std_y.inverse_transform(sgd.predict(x_test))
    # print(y_predict)
    # print(y_test)
    out = mean_absolute_error(y_test,y_predict)
    print(out)
    joblib.dump("rd","./model/{}.pkl".format(file_name))

