from django.apps import AppConfig
from django.contrib.auth import get_user_model
import logging

class AuthenticationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'authentication'

    def ready(self):
        from django.db.utils import OperationalError
        try:
            User = get_user_model()
            if not User.objects.filter(username='admin').exists():
                User.objects.create_superuser('admin', 'admin@example.com', 'admin1234')
                logging.info("✅ Superuser created!")
        except OperationalError:
            pass