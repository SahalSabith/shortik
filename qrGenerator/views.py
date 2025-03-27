from rest_framework.permissions import IsAuthenticated
from  rest_framework.response import Response
from  rest_framework.views import APIView
from  rest_framework import status
from django.conf import settings
from io import BytesIO
import qrcode
import os

# Create your views here.

class QrGeneratorView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        url = request.data.get("url")
        
        if not url:
            return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

        qr = qrcode.make(url)
        buffer = BytesIO()
        qr.save(buffer, format="PNG")
        buffer.seek(0)

        qr_dir = os.path.join(settings.MEDIA_ROOT, "qr_codes")
        if not os.path.exists(qr_dir):
            os.makedirs(qr_dir)

        qr_filename = f"qr_{request.user.id}.png"
        qr_path = os.path.join(qr_dir, qr_filename)

        with open(qr_path, "wb") as f:
            f.write(buffer.getvalue())

        return Response({"message": "QR Code generated successfully", "qr_url": f"/media/qr_codes/{qr_filename}"}, status=status.HTTP_201_CREATED)