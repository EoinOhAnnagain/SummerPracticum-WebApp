from django.contrib.auth.models import AbstractUser
from django.db import models

class Agency(models.Model):
    agency_id = models.CharField(primary_key=True, max_length=45)
    agency_name = models.CharField(max_length=45, blank=True, null=True)
    agency_url = models.CharField(max_length=45, blank=True, null=True)
    agency_timezone = models.CharField(max_length=45, blank=True, null=True)
    agency_lang = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'agency'


class Calendar(models.Model):
    service_id = models.CharField(primary_key=True, max_length=45)
    monday = models.IntegerField(blank=True, null=True)
    tuesday = models.IntegerField(blank=True, null=True)
    wednesday = models.IntegerField(blank=True, null=True)
    thursday = models.IntegerField(blank=True, null=True)
    friday = models.IntegerField(blank=True, null=True)
    saturday = models.IntegerField(blank=True, null=True)
    sunday = models.IntegerField(blank=True, null=True)
    start_date = models.CharField(max_length=45, blank=True, null=True)
    end_date = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calendar'


class CalendarDates(models.Model):
    service_id = models.CharField(max_length=45, blank=True, null=True)
    date = models.CharField(primary_key=True, max_length=45)
    exception_type = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calendar_dates'


class RealtimeBusData(models.Model):
    key = models.IntegerField(primary_key=True)
    timestamp = models.CharField(max_length=45, blank=True, null=True)
    id = models.CharField(max_length=45, blank=True, null=True)
    trip_id = models.CharField(max_length=45, blank=True, null=True)
    start_time = models.CharField(max_length=45, blank=True, null=True)
    start_date = models.CharField(max_length=45, blank=True, null=True)
    route_id = models.CharField(max_length=45, blank=True, null=True)
    stop_sequence = models.IntegerField(blank=True, null=True)
    arrival_delay = models.IntegerField(blank=True, null=True)
    departure_delay = models.IntegerField(blank=True, null=True)
    stop_id = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'realtime_bus_data'


class RealtimeWeatherData(models.Model):
    dt = models.CharField(primary_key=True, max_length=45)
    temp = models.IntegerField(blank=True, null=True)
    humidity = models.IntegerField(blank=True, null=True)
    speed = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'realtime_weather_data'

class RouteByStops(models.Model):
    shapeid = models.CharField(db_column='ShapeId', primary_key=True, max_length=45)  # Field name made lowercase.
    operator = models.CharField(db_column='Operator', max_length=45, blank=True, null=True)  # Field name made lowercase.
    stopsequence = models.IntegerField(db_column='StopSequence')  # Field name made lowercase.
    routename = models.CharField(db_column='RouteName', max_length=45, blank=True, null=True)  # Field name made lowercase.
    routedescription = models.TextField(db_column='RouteDescription', blank=True, null=True)  # Field name made lowercase.
    direction = models.TextField(db_column='Direction', blank=True, null=True)  # Field name made lowercase.
    atcocode = models.TextField(db_column='AtcoCode', blank=True, null=True)  # Field name made lowercase.
    platecode = models.TextField(db_column='PlateCode', blank=True, null=True)  # Field name made lowercase.
    latitude = models.TextField(db_column='Latitude', blank=True, null=True)  # Field name made lowercase.
    longitude = models.TextField(db_column='Longitude', blank=True, null=True)  # Field name made lowercase.
    shortcommonname_en = models.TextField(db_column='ShortCommonName_en', blank=True, null=True)  # Field name made lowercase.
    shortcommonname_ga = models.TextField(db_column='ShortCommonName_ga', blank=True, null=True)  # Field name made lowercase.
    haspole = models.TextField(db_column='HasPole', blank=True, null=True)  # Field name made lowercase.
    hasshelter = models.TextField(db_column='HasShelter', blank=True, null=True)  # Field name made lowercase.
    carouseltype = models.TextField(db_column='CarouselType', blank=True, null=True)  # Field name made lowercase.
    flagdata = models.TextField(db_column='FlagData', blank=True, null=True)  # Field name made lowercase.
    routedata = models.TextField(db_column='RouteData', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'route_by_stops'
        unique_together = (('shapeid', 'stopsequence'),)

class Routes(models.Model):
    route_id = models.CharField(primary_key=True, max_length=45)
    agency_id = models.CharField(max_length=45, blank=True, null=True)
    route_short_name = models.CharField(max_length=45, blank=True, null=True)
    route_long_name = models.CharField(max_length=45, blank=True, null=True)
    route_type = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'routes'


class Shapes(models.Model):
    shape_id = models.CharField(primary_key=True, max_length=45)
    shape_pt_lat = models.CharField(max_length=45, blank=True, null=True)
    shape_pt_lon = models.CharField(max_length=45, blank=True, null=True)
    shape_pt_sequence = models.CharField(max_length=45)
    shape_dist_traveled = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shapes'
        unique_together = (('shape_id', 'shape_pt_sequence'),)


class Stops(models.Model):
    stop_id = models.CharField(primary_key=True, max_length=45)
    stop_name = models.CharField(max_length=45, blank=True, null=True)
    stop_lat = models.CharField(max_length=45, blank=True, null=True)
    stop_lon = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stops'