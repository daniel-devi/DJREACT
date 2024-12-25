from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

#? Home Page View
def home(request):
    return HttpResponse("Welcome to the Home Page of the Backend")