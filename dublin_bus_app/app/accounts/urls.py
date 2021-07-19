from django.urls import path # new
from .views import show_user_list

urlpatterns = [
    path('user_list', show_user_list, name='user_list'),
]