from django.shortcuts import render,HttpResponse,redirect,get_object_or_404
from .models import URL
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

# Create your views here.
def home(request):
    return render(request,"index.html")

def short_url(request):
    if request.method == "POST":
        username = request.user
        url = request.POST.get("url")
        generate = URL.objects.create(original_url = url,user=username)
        generate.save()
        return redirect("url",username)
    return redirect("home")

def url(request, username):
    user = request.user.id
    urls = URL.objects.filter(user=user)
    
    qr_url = f"{settings.MEDIA_URL}qr_codes/qr_{user}.png"  # Path to saved QR

    return render(request, "url.html", {"urls": urls, "qr_url": qr_url})

def redirect_to_original(request,short_url):
    url = get_object_or_404(URL,short_url=short_url)
    url.clicks += 1  
    url.save(update_fields=['clicks'])
    return redirect(url.original_url)

@csrf_exempt
def sample(request):
    data = {"message": "Hello, this is a JSON response from Django!"}
    if request.POST:
        name = request.POST.get("name")
        print(name)
    return JsonResponse(data)