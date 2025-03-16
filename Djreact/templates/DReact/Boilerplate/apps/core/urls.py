from django.urls import path
from .views import home, FeedbackView

urlpatterns = [
    path("", home, name="home"),
    path("feedback", FeedbackView.as_view(), name="feedback",)
]