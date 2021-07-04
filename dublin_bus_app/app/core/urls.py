from django.urls import path # new
from .views import HelloWorldView, MainPageView, MapView,show_user_list
urlpatterns = [
    path('', MainPageView, name='home'),
    path('helloworld', HelloWorldView, name='HelloWorld'),
    path('map', MapView, name='MapView'),
    path('user_list', show_user_list, name='user_list')
]