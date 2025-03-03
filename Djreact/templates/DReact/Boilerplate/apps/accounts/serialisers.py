from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers
from .models import User

# Create Serializers 
class UserSerializer(UserDetailsSerializer):
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ("id", "username", "email", "profile_picture")
        read_only_fields = ("email",)
