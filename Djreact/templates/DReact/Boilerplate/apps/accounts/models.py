from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import random
import string

# Custom manager for the user model
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user with an email and password"""
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser with an email and password"""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        
        return self.create_user(email, password, **extra_fields)

def user_profile_picture_path(instance, filename):
    """Generate the path for storing profile pictures"""
    return f"profile_pictures/{instance.id}/{filename}"

def generate_random_username(length=8):
    letters = string.ascii_lowercase + string.digits
    return 'User' + '-'.join(random.choice(letters) for _ in range(length))

# Custom user model
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True, default=generate_random_username(8))
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null = True)
    profile_picture = models.ImageField(upload_to=user_profile_picture_path, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True, editable=True)
    last_login = models.DateTimeField(auto_now=True, editable=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'  # Use email as the unique identifier
    REQUIRED_FIELDS = []

    objects=CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        indexes = [models.Index(fields=["email"])]  # Index for email field to improve query performance

