from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from django.utils.html import format_html


class CustomUserAdmin(UserAdmin):
    model = User
    list_display = (
        'email', 
        'first_name', 
        'last_name', 
        'is_active', 
        'is_staff', 
        'date_joined', 
        'last_login',
        'profile_picture_preview',  
    )
    list_filter = (
        'is_active', 
        'is_staff', 
        'is_superuser',
        'groups',
        'date_joined',
    )
    search_fields = ('email', 'first_name', 'last_name')
    readonly_fields = ('date_joined', 'last_login', 'profile_picture_preview')
    ordering = ('-date_joined',)  

    fieldsets = (
        ('Basic Info', {
            'fields': ('username', 'email', 'password')
        }),
        ('Personal Info', {
            'fields': ('first_name', 'last_name', 'profile_picture', 'profile_picture_preview', ),
            'classes': ('wide',),
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
            'classes': ('collapse',),  
        }),
        ('Important Dates', {
            'fields': ('last_login', 'date_joined'),
            'classes': ('collapse',),  
        }),
    )

    add_fieldsets = (
        ('Create User', {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )

    def profile_picture_preview(self, obj):
        if obj.profile_picture:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 50%;" />',
                obj.profile_picture.url
            )
        return "(No Image)"
    profile_picture_preview.short_description = "Profile Picture"


admin.site.register(User, CustomUserAdmin)
