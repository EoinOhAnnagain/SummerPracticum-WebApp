from django.urls import path # new
from .views import HelloWorldView, MainPageView
urlpatterns = [
    path('helloworld', HelloWorldView, name='HelloWorld'),
    path('', MainPageView, name='MainPageView'),
]