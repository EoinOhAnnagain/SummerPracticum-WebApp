from django.shortcuts import render
from django.http import HttpResponse

def HelloWorldView(request):
    response = HttpResponse("Hello World!")
    return response

def MainPageView(request):
    return render(request, "index.html")