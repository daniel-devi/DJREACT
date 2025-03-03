from django.contrib import admin
from .models import Payment

# Register your models here.

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_active', 'stripe_customer_id', 'stripe_subscription_id')
    search_fields = ('user__email',)

admin.site.register(Payment, PaymentAdmin)
