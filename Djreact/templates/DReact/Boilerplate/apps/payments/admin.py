from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_active', 'stripe_customer_id', 'stripe_subscription_id', 'created_at', )
    list_filter = ('is_active', 'created_at')  
    search_fields = ('user__email', 'stripe_customer_id', 'stripe_subscription_id')  
    ordering = ('-created_at',) 
    readonly_fields = ('created_at',)  
    date_hierarchy = 'created_at'  

    fieldsets = (
        (None, {
            'fields': ('user', 'is_active')
        }),
        ('Stripe Info', {
            'fields': ('stripe_customer_id', 'stripe_subscription_id')
        }),
        ('Timestamps', {
            'fields': ('created_at',)
        }),
    )

