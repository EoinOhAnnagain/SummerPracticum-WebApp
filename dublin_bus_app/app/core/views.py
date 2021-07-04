from django.shortcuts import render
from django.http import HttpResponse
from .models import CustomUser


def HelloWorldView(request):
    response = HttpResponse("Hello World!")
    return response

def MainPageView(request):
    return render(request, "index.html")

def MapView(request):
    return render(request, "map.html")

def show_user_list(request):
    user_list = CustomUser.objects.order_by('username')
    output = ', '.join([user.username for user in user_list])
    return HttpResponse(output)
