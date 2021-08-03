from django.urls import path # new
from .views import ApproachingBuses, FareCalculation, Traveltime, HelloWorldView, MainPageView, MapView, Stops, SelectRoute,show_agency_list, LiveData, Routes

urlpatterns = [
    path('', MainPageView, name='home'),
    path('helloworld', HelloWorldView, name='HelloWorld'),
    path('map', MapView, name='MapView'),
    path('stops', Stops, name='Stops'),
    path('routes', Routes, name='Routes'),
    path('selectRoute', SelectRoute, name='SelectRoute'),
    path('liveData/<str:stopNumber>/', LiveData, name='liveData'),
    path('approach/<str:stopNumber>/', ApproachingBuses, name='approachingBuses'),
    # path('agn_list',show_agency_list, name ='show_agency_list'),
    path('Fare', FareCalculation, name='FareCalculation'),
    path('Travel',Traveltime, name='Traveltime')
]
