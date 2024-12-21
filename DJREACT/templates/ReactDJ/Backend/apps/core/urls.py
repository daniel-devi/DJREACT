from django.urls import path
from .views import *

# Create your URLS here.

urlpatterns = [
    # Home Page URL - GET - 127.0.0.1:8000/
    path('', home, name='home'),
    
    # TODO: Add your URLS here.
]
