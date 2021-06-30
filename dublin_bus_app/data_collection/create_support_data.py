from pymysql import connect
class create_database:
    def __init__(self):
        pass
    def create_table(self):
        conn = connect(host="173.82.72.146", port=3306, user="root", password="4TheWin2021@", database="project",
                            charset="utf8")
        cs = conn.cursor()
        try:
            try:
                cs.execute("drop table agency;")
            except Exception as e:
                pass
            value_1 = "create table agency (agency_id VARCHAR(45),agency_name VARCHAR(45),agency_url VARCHAR(45),agency_timezone VARCHAR(45),agency_lang VARCHAR(45));"
            cs.execute(value_1)
            try:
                cs.execute("drop table calendar;")
            except Exception as e:
                pass
            value_2 = "create table calendar (service_id VARCHAR(45), monday INT,tuesday INT,wednesday INT, thursday INT, friday INT, saturday INT, sunday INT, start_date VARCHAR(45),end_date VARCHAR(45));"
            cs.execute(value_2)


            try:
                cs.execute("drop table calendar_dates;")
            except Exception as e:
                pass
            value_3 = "create table calendar_dates (service_id VARCHAR(45), date VARCHAR(45), exception_type INT);"
            cs.execute(value_3)



            try:
                cs.execute("drop table routes;")
            except Exception as e:
                pass
            value_4 = "create table routes (route_id VARCHAR(45), agency_id VARCHAR(45),route_short_name VARCHAR(45),route_long_name VARCHAR(45), route_type INT);"
            cs.execute(value_4)




            try:
                cs.execute("drop table shapes;")
            except Exception as e:
                pass
            value_5 = "create table shapes (shape_id VARCHAR(45), shape_pt_lat VARCHAR(45),shape_pt_lon VARCHAR(45),shape_pt_sequence VARCHAR(45), shape_dist_traveled double);"
            cs.execute(value_5)





            try:
                cs.execute("drop table stop_times;")
            except Exception as e:
                pass
            value_6 = "create table stop_times (trip_id VARCHAR(45), arrival_time VARCHAR(45),departure_time VARCHAR(45),stop_id VARCHAR(45), stop_sequence INT,stop_headsign VARCHAR(45),pickup_type int,drop_off_type int,shape_dist_traveled double);"
            cs.execute(value_6)



            try:
                cs.execute("drop table stops;")
            except Exception as e:
                pass
            value_7 = "create table stops (stop_id VARCHAR(45), stop_name VARCHAR(45),stop_lat VARCHAR(45),stop_lon VARCHAR(45));"
            cs.execute(value_7)


            try:
                cs.execute("drop table transfers;")
            except Exception as e:
                pass
            value_8 = "create table transfers (from_stop_id VARCHAR(45), to_stop_id VARCHAR(45),transfer_type int,min_transfer_time int);"
            cs.execute(value_8)



            try:
                cs.execute("drop table trips;")
            except Exception as e:
                pass
            value_9 = "create table trips (route_id VARCHAR(45), service_id VARCHAR(45),trip_id VARCHAR(45),shape_id VARCHAR(45),trip_headsign VARCHAR(45),direction_id VARCHAR(45));"
            cs.execute(value_9)




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