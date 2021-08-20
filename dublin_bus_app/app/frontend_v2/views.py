from django.shortcuts import render

# Create your views here.
def index_view(request):
    return render(request, 'frontend_v2/index.html', context=None)

