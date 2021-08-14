from django.urls import path, include
from .views import index_view
from django.conf.urls import url

urlpatterns = [
    path('', index_view),  # for the empty url
    url(r'^.*/$', index_view),  # for all other urls

]