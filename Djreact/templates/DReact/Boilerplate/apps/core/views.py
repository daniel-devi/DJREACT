from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny
from .serialisers import FeedbackSerializer
from .models import Feedback

# Create your views here.
def home(request):
    return JsonResponse({
        "Success": "Welcome to the API",
    })

class FeedbackView(ListCreateAPIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()

