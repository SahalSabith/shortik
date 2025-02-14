from django.db import models
import string, random
from django.contrib.auth.models import User

# Create your models here.
def shorter():
    return "".join(random.choices(string.ascii_letters + string.digits, k=4))

class URL(models.Model):
    original_url = models.URLField()
    short_url = models.CharField(max_length=6, unique=True, default=shorter)
    created = models.DateTimeField(auto_now_add=True)
    clicks = models.IntegerField(default=0)
    user = models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.original_url