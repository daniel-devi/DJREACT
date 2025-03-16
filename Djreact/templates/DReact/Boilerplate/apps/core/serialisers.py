from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ("user", "email", "feedback_type", "message", "status", "created_at", "updated_at")
        read_only_fields = ("created_at", "updated_at",)