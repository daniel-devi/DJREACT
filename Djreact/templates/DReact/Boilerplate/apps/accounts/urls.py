from django.urls import path
from .views import GoogleLogin, UserProfileView

urlpatterns = [
    path("google/", GoogleLogin.as_view(), name="google-login"),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
]
