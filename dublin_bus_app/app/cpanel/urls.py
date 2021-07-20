from django.urls import path
from . import views
urlpatterns = [
    path('signin/',views.singIn),
    path('postsign/',views.postsign),
]