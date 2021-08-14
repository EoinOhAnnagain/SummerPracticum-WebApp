from django.shortcuts import render
from django.http import HttpResponse
# from .models import CustomUser
from django.db.models import Q

from django.http import JsonResponse
from django.contrib.staticfiles import finders

from .models import *

from django.views.decorators.csrf import csrf_exempt

import json
from datetime import datetime, timedelta

"""Hank add for testing dB"""
def show_agency_list(request):
    user_list = Agency.objects.order_by('agency_name')
    output = ', '.join([user.agency_name for user in user_list])
    return HttpResponse(output)

def ApproachingBuses(request, stopNumber):
    now = datetime.now() # Get todays date and format it same as database
    current_time = now.strftime("%H:%M:%S")
    print(current_time, "is current time")
    format = "%H:%M:%S"
    current_time = datetime.strptime(current_time, format)
    current_hour = str(current_time.hour)
    if int(str(current_hour))+ 1 >= 24:
        next_hour = str(int(str(current_hour))+ 1 - 24) 
    else:
        next_hour = str(int(str(current_hour))+ 1) 
    current_hour = current_hour.zfill(2)
    next_hour = next_hour.zfill(2)
    print("Current hour is", current_time.hour)
    dayOfWeek = datetime.today().weekday() # Get today's day of week
    if dayOfWeek == 0 or (dayOfWeek==1 and int(str(current_time)[:2])<4):
        allBuses = MondayStops.objects.filter(Q(stop_id = stopNumber) & (Q(arrival_time__startswith=current_hour)| Q(arrival_time__startswith=next_hour)))
        print("monday")
    elif dayOfWeek == 1 or (dayOfWeek==2 and int(str(current_time)[:2])<4):
        allBuses = TuesdayStops.objects.filter(Q(stop_id = stopNumber) & (Q(arrival_time__startswith=current_hour)| Q(arrival_time__startswith=next_hour)))
        print("Tuesday")
    elif dayOfWeek >= 2 and dayOfWeek <= 4 or (dayOfWeek==5 and int(str(current_time)[:2])<4):
        allBuses = WethfrStops.objects.filter(Q(stop_id = stopNumber) & (Q(arrival_time__startswith=current_hour)| Q(arrival_time__startswith=next_hour)))
        print("Weds/thurs/fri")
    elif dayOfWeek == 5 or (dayOfWeek==6 and int(str(current_time)[:2])<4):
        allBuses = SaturdayStops.objects.filter(Q(stop_id = stopNumber) & (Q(arrival_time__startswith=current_hour)| Q(arrival_time__startswith=next_hour)))
        print("saturday")
    else:
        allBuses = SundayStops.objects.filter(Q(stop_id = stopNumber) & (Q(arrival_time__startswith=current_hour)| Q(arrival_time__startswith=next_hour)))
        print("sunday")
    # allBuses = WethfrStops.objects.filter(Q(stop_id=stopNumber) & (Q(arrival_time__startswith=str(current_time.hour))| Q(arrival_time__startswith=str(current_time.hour +1))))
    lateOrEarlyBuses = RealtimeBusData.objects.all() # Access latest realtime buses
    print(allBuses)
    dueBuses = [] # To capture final buses
    for bus in allBuses: # Loop through buses
        route_id = bus.trip_id.split(".")[2]
        split_elements = route_id.split("-") # Get the route_short_name by splitting route_id
        route_number = split_elements[1]
        if int(current_hour) >= 23 and int(current_hour) <=3: # This method takes a lot of time - only call in early morning when necessary
            for i in range(24, 30): # Some rows are in 25+ hour time - reformat to avoid errors
                over24Hr = str(i)
                in24Hr = str(i-24)
                if bus.arrival_time.startswith(over24Hr):
                    arrival = bus.arrival_time.replace(over24Hr, in24Hr, 1)
                    break
        else:
            arrival = bus.arrival_time
        arrival = datetime.strptime(arrival, format) # Format arrival time
        tdelta = arrival - current_time # Get time difference between arrival and now
        if tdelta.days < 0: # Catch a 'minus days' situation, e.g. (00:05 - 23:55)
            tdelta = timedelta(days=0, seconds=tdelta.seconds)
        print(tdelta.seconds)
        timeChange = 0 # Store deviation from schedule
        # if lateOrEarlyBuses.filter(trip_id = bus.trip_id).exists(): # Check if bus trip is in late/early buses
        #     lateOrEarlyBus = lateOrEarlyBuses.filter(trip_id = bus.trip_id)[0]
        #     timeChange+= lateOrEarlyBus.departure_delay # Add departure delay to time change
        countdown = tdelta.seconds + timeChange # Additional variable for JSON that stores countdown in seconds
        if (tdelta.seconds >0 and tdelta.seconds < 1800): # Limit response to buses arriving in next half-hour
            dueBuses.append({"id": bus.trip_id, "route_number": route_number, "arrivalTime": bus.arrival_time, "timeChange" : timeChange, "countdown": countdown})
    json_string = json.dumps(dueBuses)
    jsonBuses = json.loads(json_string)
    def sortByArrival(value): # Sort JSON object so soonest bus displays at the top
        return value["arrivalTime"]
    sortedBuses = sorted(jsonBuses, key=sortByArrival)
    print(sortedBuses)
    return JsonResponse(sortedBuses, safe=False)


@csrf_exempt
def LiveData(request, stopNumber):
    print(stopNumber)
    # Convert the list of stops from JSON
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    # Format the stops into a list
    routeList = body.strip(" ").split(",")
    routeList = [x.strip(' ') for x in routeList]
    print(routeList)
    # Get the corresponding formal name for each route for live data API
    routeFullnameList = []
    for i in range (len(routeList)):
        routeFullname = Routes.objects.get(route_short_name = routeList[i])
        routeFullnameList.append(routeFullname)
    print(routeFullnameList)
    print([x.route_id for x in routeFullnameList])
    # Set up lists to capture queryset objects & django model objects
    movingBuses = []
    outbound = []
    inbound = []
    # Get the live bus data corresponding to route names
    for route in routeFullnameList:
        movingBuses.append(RealtimeBusData.objects.filter(route_id = route.route_id))
    print(movingBuses)
    # Divide the live bus data into inbound and outbound
    for route in movingBuses:
        for bus in route:
            if bus.trip_id[-1] == "I":
                inbound.append(bus)
            else:
                outbound.append(bus)
    print("inbound", inbound)
    print("outbound", outbound)
    # Access live data
    inboundStopNumbers = []
    for bus in inbound:
        busRoute = Routes.objects.get(route_id = bus.route_id)
        queryStop = RouteByStops.objects.filter(RouteName = busRoute.route_id, Direction = "I", PlateCode = stopNumber)
        if bus.stop_sequence > queryStop.StopSequence:
            pass
        else:
            for i in range (bus.stop_sequence, queryStop.StopSequence):
                inboundStopNumbers.append(RouteByStops.objects.filter(RouteName = busRoute.route_id, Direction="I", PlateCode = i))

    print(inboundStopNumbers)
    return JsonResponse(body, safe=False)

def SelectRoute(request):
    origin = request.GET['origin']
    destination = request.GET['destination']
    print("HERE", origin, destination)
    return HttpResponse("Your journey is important to us, please wait while we finish the app and we'll figure it out")

def Stops(request):
   json_data = open(finders.find('JSON/stops_and_their_buses.json'))
   print("Found stops")
   data1 = json.load(json_data)  # deserialises it
   json_data.close()
   return JsonResponse(data1, safe=False) # , safe=False

def Routes(request):
   json_data = open(finders.find('JSON/routes.json'))
   print("Found routes")
   data2 = json.load(json_data)  # deserialises it
   json_data.close()
   return JsonResponse(data2, safe=False) # , safe=False

def HelloWorldView(request):
    response = HttpResponse("Hello World!")
    return response

def MainPageView(request):
    return render(request, "index.html")

def MapView(request):

    return render(request, "map.html")

from core.fare_calculation import fare_crawler
@csrf_exempt
def FareCalculation(request):
    print(request, "is the request")
    if request.method == "POST":
        post_data = json.loads(request.body.decode("utf-8"))
        stops_number = post_data.get('param_1')
        print(stops_number, "is stops number")
        route_number = post_data.get('param_2')
        print(route_number, "is route number")
        f = fare_crawler(route_number,int(stops_number))
        parsed = f.parse()
        #order = "python3 core/fare_calculation.py {} {}".format(stops_number,route_number)
        #result = subprocess.check_output(order)
        result = list(parsed)
        length = len(result)//2 # to divide array
        categories = result[:length]
        fares = result[length:]
        listedFares = []
        for i in range(length):
            combined = dict()
            combined["category"] = categories[i]
            combined["fare"] = fares[i]
            listedFares.append(combined)
        print("combined dictionary is", listedFares)
        #zipped = list(zip(categories, fares))
        return JsonResponse(listedFares, safe=False)

from core.machine_learning import travel_time
@csrf_exempt
def Traveltime(request):
    # total_time = 1
    if request.method == "POST":
        post_data = json.loads(request.body.decode("utf-8"))
        stops_number = post_data.get('param_1')
        route_number = post_data.get('param_2')
        start_stop = post_data.get('param_3')
        journey_date = post_data.get('param_4')
        print(journey_date, "is journey date")
        time = travel_time(stops_number,route_number,start_stop,journey_date)
        total_time = time.get_sql_info()
    return JsonResponse(total_time, safe=False)
    #return JsonResponse(1500, safe=False) 
