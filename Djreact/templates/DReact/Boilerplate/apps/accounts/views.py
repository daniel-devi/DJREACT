from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serialisers import UserSerializer

# Create views here.

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
