from django.urls import path # new
from .views import HelloWorldView, MainPageView, MapView, Stops, SelectRoute,show_user_list

urlpatterns = [
    path('', MainPageView, name='home'),
    path('helloworld', HelloWorldView, name='HelloWorld'),
    path('map', MapView, name='MapView'),
    path('stops', Stops, name='Stops'),
    path('selectRoute', SelectRoute, name='SelectRoute'),
    path('user_list', show_user_list, name='user_list')
]