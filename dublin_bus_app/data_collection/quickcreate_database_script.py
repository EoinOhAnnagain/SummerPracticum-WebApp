from pymysql import connect
class create_database:
    def __init__(self):
        pass
    def create_table(self):
        conn = connect(host="localhost", port=3306, user="root", password="mysql", database="project",
                            charset="utf8")
        cs = conn.cursor()
        try:
            try:
                cs.execute("drop table realtime_bus_data")
            except Exception as e:
                pass
            value_1 = "create table realtime_bus_data (timestamp int,id VARCHAR(45),trip_id VARCHAR(45),start_time VARCHAR(45),start_date VARCHAR(45),route_id VARCHAR(45),stop_sequence INT,arrival_delay INT,departure_delay INT,stop_id VARCHAR(45))"
            cs.execute(value_1)
            try:
                cs.execute("drop table realtime_weather_data")
            except Exception as e:
                pass
            value_2 = "create table realtime_weather_data (dt INT, temp INT,humidity INT,speed INT, description VARCHAR(45))"
            cs.execute(value_2)
            conn.commit()
        except Exception as e:
            print("error")
        cs.close()
        conn.close()
    def run(self):
        self.create_table()
if __name__ == "__main__":
    Bike = create_database()
    Bike.run()
