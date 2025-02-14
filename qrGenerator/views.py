from django.shortcuts import render,redirect
import qrcode
from io import BytesIO
from django.http import HttpResponse
from django.conf import settings
import os

# Create your views here.
def generate_qr(request):
    if request.method == "POST":
        url = request.POST.get("url")
        if url:
            # Generate QR code
            qr = qrcode.make(url)
            buffer = BytesIO()
            qr.save(buffer, format="PNG")
            buffer.seek(0)

            # Ensure the directory exists
            qr_dir = os.path.join(settings.MEDIA_ROOT, "qr_codes")
            if not os.path.exists(qr_dir):
                os.makedirs(qr_dir)  # Create the directory if it doesn't exist

            # Save QR code image in media/qr_codes/
            qr_filename = f"qr_{request.user.id}.png"
            qr_path = os.path.join(qr_dir, qr_filename)

            with open(qr_path, "wb") as f:
                f.write(buffer.getvalue())

            return redirect("url", username=request.user.username)  # Redirect to url view
    
    return redirect("url")