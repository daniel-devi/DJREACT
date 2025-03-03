from django.contrib import admin
from .models import Feedback

# Register your models here.

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'feedback_type', 'rating', 'status', 'created_at')
    list_filter = ('feedback_type', 'status')
    search_fields = ('message', 'user__email')
    ordering = ('-created_at',)

admin.site.register(Feedback, FeedbackAdmin)
