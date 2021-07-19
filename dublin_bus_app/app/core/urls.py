from django.urls import path # new
from .views import HelloWorldView, MainPageView, MapView, Stops, SelectRoute,show_agency_list, LiveData

urlpatterns = [
    path('', MainPageView, name='home'),
    path('helloworld', HelloWorldView, name='HelloWorld'),
    path('map', MapView, name='MapView'),
    path('stops', Stops, name='Stops'),
    path('selectRoute', SelectRoute, name='SelectRoute'),
    path('liveData/<str:stopNumber>/', LiveData, name='liveData'),
    path('agn_list',show_agency_list, name ='show_agency_list'),
    path('Fare', FareCalculation, name='FareCalculation'),
    path('Travel',Traveltime, name='Traveltime')
]
