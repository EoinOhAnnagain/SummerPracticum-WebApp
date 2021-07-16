from django.shortcuts import render
from .models import CustomUser
from django.http import HttpResponse

# Create your views here.
def show_user_list(request):
    user_list = CustomUser.objects.order_by('username')
    output = ', '.join([user.username for user in user_list])
    return HttpResponse(output)