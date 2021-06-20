from django.urls import path # new
from .views import HelloWorldView # new
urlpatterns = [
    path('', HelloWorldView, name='HelloWorld'),
]