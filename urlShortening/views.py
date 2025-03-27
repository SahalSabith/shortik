from django.shortcuts import redirect,get_object_or_404
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import URLSerializer
from django.conf import settings
from rest_framework import status
from .models import URL
import os
from django.conf import settings

# Create your views here.
class UrlShortView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        data = request.data.copy()
        data["user"] = request.user.id

        serializer = URLSerializer(data=data)
        if serializer.is_valid():
            url_instance = serializer.save()
            return Response({"success": "URL Generated Successfully","short_url":url_instance.short_url}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UrlGetView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        urls = URL.objects.filter(user=user).order_by('-created') 
        serializer = URLSerializer(urls, many=True)

        qr_codes_dir = os.path.join(settings.MEDIA_ROOT, "qr_codes")
        
        qr_filename = f"qr_{user.id}.png"
        qr_path = os.path.join(qr_codes_dir, qr_filename)

        qr_url = f"/media/qr_codes/{qr_filename}" if os.path.exists(qr_path) else None

        return Response(
            {"urls": serializer.data, "qr_code": qr_url},
            status=status.HTTP_200_OK
        )
    
class RedirectView(APIView):
    permission_classes = [AllowAny]

    def get(self,request,short_url):
        url = get_object_or_404(URL,short_url=short_url)
        if url.status:
            url.clicks += 1  
            url.save(update_fields=['clicks'])
            return Response({"success": True, "original_url": url.original_url}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "message": "URL is inactive"}, status=status.HTTP_400_BAD_REQUEST)
