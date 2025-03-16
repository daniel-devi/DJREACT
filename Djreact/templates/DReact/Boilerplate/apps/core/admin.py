from django.contrib import admin
from .models import Feedback
from django.utils.html import format_html

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'feedback_type', 'status', 'short_message', 'created_at')
    list_filter = ('feedback_type', 'status')
    search_fields = ('message', 'user__email')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    list_editable = ('status',)  # Make status editable from list
    fieldsets = (
        ('Feedback Info', {
            'fields': ('user', 'feedback_type', 'message', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)  
        }),
    )

    def short_message(self, obj):
        return (obj.message[:50] + '...') if len(obj.message) > 50 else obj.message
    short_message.short_description = "Message Preview"

admin.site.register(Feedback, FeedbackAdmin)
