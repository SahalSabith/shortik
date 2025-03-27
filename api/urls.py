from django.urls import path
from authentication.views import LoginView, RegisterView, LogoutView, UserDetailsView
from qrGenerator.views import QrGeneratorView
from urlShortening.views import UrlShortView, UrlGetView,RedirectView

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('user-details/',UserDetailsView.as_view()),
    path('qr-generate/', QrGeneratorView.as_view()),
    path("short-url/", UrlShortView.as_view()),
    path("urls/", UrlGetView.as_view()),
    path('redirect/<str:short_url>/', RedirectView.as_view()),
]
