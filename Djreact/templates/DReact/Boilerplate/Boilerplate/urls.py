"""
URL configuration for Boilerplate project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    # Admin panel
    path("admin/", admin.site.urls),

    # Authentication endpoints
    path("api/auth/", include("dj_rest_auth.urls")),  # Login, Logout, Password reset
    path("api/auth/registration/", include("dj_rest_auth.registration.urls")),  # Signup with email
    path("api/auth/social/", include("allauth.socialaccount.urls")),  # Social authentication (Google, etc.)

    # Django Apps
    path("api/", include("apps.core.urls")),  # Main endpoints
    path("api/accounts/", include("apps.accounts.urls")),  # User profile endpoints
    path("api/payments/", include("apps.payments.urls")),  # Payment endpoints
]

