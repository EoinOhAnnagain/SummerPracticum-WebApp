from django.shortcuts import render
import pyrebase

config = {

    "apiKey": "AIzaSyBwR5bwgujjEu6n25LLnniVC7-EIrco4xA",
    "authDomain": "dublinbus-34459.firebaseapp.com",
    'databaseURL': "https://dublinbus-34459.firebaseio.com",
    "storageBucket": "dublinbus-34459.appspot.com",
  }

firebase = pyrebase.initialize_app(config)

auth = firebase.auth()

def singIn(request):

    return render(request, "signIn.html")

def postsign(request):
    email = request.POST.get('email')
    passw = request.POST.get("pass")
    try:
        user = auth.sign_in_with_email_and_password(email,passw)
    except:
        message = "invalid cerediantials"
        return render(request,"signIn.html",{"msg":message})
    print(user)
    return render(request, "welcome.html",{"e":email})
