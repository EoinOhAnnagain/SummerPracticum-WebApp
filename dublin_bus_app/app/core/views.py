from django.shortcuts import render
from django.http import HttpResponse
# from .models import CustomUser

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
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    print(current_time, "is current time")
    format = "%H:%M:%S"
    current_time = datetime.strptime(current_time, format)
    allBuses = StopTimesSeqNum.objects.filter(stop_id = stopNumber)
    print(allBuses)
    dueBuses = []
    for bus in allBuses:
        route_id = bus.route_id
        split_elements = route_id.split("-")
        route_number = split_elements[1]
        if bus.arrival_time.startswith("24"): # Correct incorrect formatting of time
            arrival = bus.arrival_time.replace("24", "00", 1)
        else:
            arrival = bus.arrival_time
        arrival = datetime.strptime(arrival, format)
        tdelta = arrival - current_time # Get time difference between arrival and now
        if tdelta.days < 0:
            tdelta = timedelta(days=0, seconds=tdelta.seconds)
        print(tdelta.seconds)
        if (tdelta.seconds >0 and tdelta.seconds < 3600): # Get details of all buses in next hour
            dueBuses.append({"id": bus.trip_id, "route_number": route_number, "arrivalTime": bus.arrival_time})
    json_string = json.dumps(dueBuses)
    jsonBuses = json.loads(json_string)
    # Sort by closest to furthest away
    def sortByArrival(value):
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
   # stopsPath = finders.find("JSON/stops.json")
   # stopsString = json.loads(stopsPath)
   # print(stopsString)
   json_data = open(finders.find('JSON/stops_and_their_buses.json'))
   data1 = json.load(json_data)  # deserialises it
   json_data.close()
   return JsonResponse(data1, safe=False) # , safe=False


def HelloWorldView(request):
    response = HttpResponse("Hello World!")
    return response

def MainPageView(request):
    return render(request, "index.html")

def MapView(request):

    return render(request, "map.html")

def show_user_list(request):
    user_list = CustomUser.objects.order_by('username')
    output = ', '.join([user.username for user in user_list])
    return HttpResponse(output)

