from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.models import EmailAddress
from rest_framework import serializers
from .models import User

# Create Serializers 
class UserSerializer(UserDetailsSerializer):
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "profile_picture", "date_joined", "last_login")
        read_only_fields = ("email", "date_joined", "last_login")
        
class CustomRegisterSerializer(RegisterSerializer):
    def save(self, request):
        user = super().save(request)
        
        # Create and verify the email address
        EmailAddress.objects.create(
            user=user,
            email=user.email,
            verified=True, 
            primary=True
        )
        
        return user