from django.db import models
from django.utils.timezone import now
import string, random
from django.contrib.auth.models import User
from datetime import timedelta

# Create your models here.
def shorter():
    return "".join(random.choices(string.ascii_letters + string.digits, k=4))

class URLManager(models.Manager):
    def get_queryset(self):
        queryset = super().get_queryset()
        expired_urls = queryset.filter(created__lt=now() - timedelta(hours=2), status=True)

        expired_urls.update(status=False)

        return queryset

class URL(models.Model):
    original_url = models.URLField()
    short_url = models.CharField(max_length=6, unique=True, default=shorter)
    created = models.DateTimeField(auto_now_add=True)
    clicks = models.IntegerField(default=0)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    status = models.BooleanField(default=True)

    objects = URLManager()

    def __str__(self):
        return self.original_url