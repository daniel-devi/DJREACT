"""
Django settings for Backend project.

Generated by 'django-admin startproject' using Django 4.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!

#! SECURITY WARNING: keep the secret key used in production secret!

SECRET_KEY = config('SECRET_KEY', default="<GENERATE_SECRET_KEY>")

#! SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=False, cast=bool)

#! SECURITY WARNING: don't run with allow all hosts in production!
ALLOWED_HOSTS = [] # TODO: Change this to frontend url and dependencies url


# Application definition

INSTALLED_APPS = [
    "jazzmin", # Jazzmin admin panel - Must be the first app
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Django Apps
    'apps.authentication',
    'apps.core',
    #? The Django apps should be created in Apps folder and added in this format: apps.<app_name>

    # Third Party Apps
    'corsheaders', # Cross-Origin Resource Sharing - Prevents CORS errors
    'rest_framework', # REST Framework - Django REST Framework is a framework for building Web APIs
    'rest_framework_simplejwt', # Simple JSON Web Token - JWT authentication for Django REST Framework
    # add more apps here
    'apps.authentication', # Authentication
    'apps.core',    # Core
    # Add django app in this format - '<app.appName>', 
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Cross-Origin Resource Sharing Middleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [] 

# Media files
# https://docs.djangoproject.com/en/4.2/topics/files/
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media' # This is the directory where the media files will be stored

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# -----------------------------------------------------------------------------------------
#?  Custom Settings
# -----------------------------------------------------------------------------------------

# Django Email Settings
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default="") # TODO: Change this to your email
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default="") # TODO: Change this to your email password

# Django Redis Settings
REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_DB = 0

# Django Auth User Model
AUTH_USER_MODEL = 'app.authentication.User'

# Django Rest Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

# Django Simple JWT Settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
}

# Django CORS Settings
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWS_CREDENTIALS = True

#? ----------------------------------------------------------------------------------------------------

#?Jazzmin Configuration

#? ----------------------------------------------------------------------------------------------------

# JAZZMIN DOCUMENTATION: https://jazzmin.django-extensions.dev/docs/settings/ for more settings

# TODO: Change the settings below to your own settings
JAZZMIN_SETTINGS = {
    "site_title": "Backend",
    "site_header": "Backend Admin Panel",
    "site_brand": "Backend",
    "site_logo": "images/logo.png",
    "site_icon": "images/logo.png",
    "welcome_sign": "Welcome to the Backend Admin Panel",
    "copyright": "Backend",
    "login_logo": "images/logo.png",
    "login_logo_dark": "images/logo.png",
    'theme': 'darkly',
    "dark_mode": True,
    "topmenu_links": [
        {"name": "Home", "url": "admin:index", "permissions": ["auth.view_user"]},
        {"model": "auth.User"},
        {"app": "account"},
    ],
}