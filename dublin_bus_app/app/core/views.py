from django.shortcuts import render
from django.http import HttpResponse
# from .models import CustomUser

from django.http import JsonResponse
from django.contrib.staticfiles import finders

from .models import *

from django.views.decorators.csrf import csrf_exempt

import json

"""Hank add for testing dB"""
def show_agency_list(request):
    user_list = Agency.objects.order_by('agency_name')
    output = ', '.join([user.agency_name for user in user_list])
    return HttpResponse(output)

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

# def show_user_list(request):
#     user_list = CustomUser.objects.order_by('username')
#     output = ', '.join([user.username for user in user_list])
#     return HttpResponse(output)

from core.fare_calculation import fare_crawler
def FareCalculation(request):
    if request.method == "POST":
        stops_number = request.POST.get('param_1')
        route_number = request.POST.get('param_2')
        f = fare_crawler(route_number,int(stops_number))
        result = f.parse()
        #order = "python3 core/fare_calculation.py {} {}".format(stops_number,route_number)
        #result = subprocess.check_output(order)
        print(result)
        return HttpResponse(result)
from core.machine_learning import travel_time
def Traveltime(request):
    # total_time = 1
    if request.method == "POST":
        stops_number = request.POST.get('param_1')
        route_number = request.POST.get('param_2')
        start_stop = request.POST.get('param_3')
        time = travel_time(stops_number,route_number,start_stop)
        total_time = time.get_sql_info()
    return HttpResponse(total_time)
