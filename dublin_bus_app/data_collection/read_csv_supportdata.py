import pymysql
config = {'host':'173.82.208.22',
          'port':3306,
          'user':'root',
          'passwd':'4TheWin!',
          'charset':'utf8',
          'database':'project',
          'local_infile':1
          }
conn = pymysql.connect(**config)
cur = conn.cursor()

def load_csv():
    data_sql = "load data local infile './agency.csv' into table agency fields terminated by ',';"
    data_sql_2 = "load data local infile './calendar.csv' into table calendar fields terminated by ',';"
    data_sql_3 = "load data local infile './calendar_dates.csv' into table calendar_dates fields terminated by ',';"
    data_sql_4 = "load data local infile './routes.csv' into table routes fields terminated by ',';"
    data_sql_5 = "load data local infile './shapes.csv' into table shapes fields terminated by ',';"
    data_sql_6 = "load data local infile './times.csv' into table stop_times fields terminated by ',';"
    data_sql_7 = "load data local infile './stops.csv' into table stops fields terminated by ',';"
    data_sql_8 = "load data local infile './trips.csv' into table trips fields terminated by ',';"
    cur.execute(data_sql)
    cur.execute(data_sql_2)
    cur.execute(data_sql_3)
    cur.execute(data_sql_4)
    cur.execute(data_sql_5)
    cur.execute(data_sql_6)
    cur.execute(data_sql_7)
    cur.execute(data_sql_8)
    conn.commit()
    conn.close()
    cur.close()
load_csv()
