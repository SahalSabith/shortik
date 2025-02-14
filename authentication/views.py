from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import login

# Create your views here.
def signIn(request):
    return render(request,"signIn.html")

def signUp(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        cPassword = request.POST.get("cpassword")
        if password == cPassword:
            user = User.objects.create_user(username=username,email=email,password=cPassword)
            user.save()
            login(request,user)
            return redirect("home")

    return render(request,"signUp.html")