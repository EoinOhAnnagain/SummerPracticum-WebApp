from django.urls import path # new
from .views import HelloWorldView, MainPageView, MapView, Stops, SelectRoute
urlpatterns = [
    path('helloworld', HelloWorldView, name='HelloWorld'),
    path('', MainPageView, name='MainPageView'),
    path('map', MapView, name='MapView'),
    path('stops', Stops, name='Stops'),
    path('selectRoute', SelectRoute, name='SelectRoute'),
]