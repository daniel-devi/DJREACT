from django.db import models
from django.contrib.auth import get_user_model
from decouple import config
import stripe

# Create models here.

#TODO: Set up Stripe secret key
stripe.api_key = config("STRIPE_API_KEY", default='your_stripe_test_secret_key')

User = get_user_model()

class Payment(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_subscription_id = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=False)  # If the user has an active subscription
    created_at = models.DateTimeField(auto_now_add=True)
    
    def create_stripe_customer(self, email):
        """Create a new Stripe customer for the user."""
        customer = stripe.Customer.create(
            email=email,
            description=f"Customer for {email}",
        )
        self.stripe_customer_id = customer.id
        self.save()
        return customer

    def create_subscription(self, price_id):
        """Create a subscription for the user."""
        if not self.stripe_customer_id:
            raise ValueError("Stripe customer ID is required to create a subscription.")
        
        subscription = stripe.Subscription.create(
            customer=self.stripe_customer_id,
            items=[{'price': price_id}],
        )
        self.stripe_subscription_id = subscription.id
        self.is_active = True
        self.save()
        return subscription

    def cancel_subscription(self):
        """Cancel the user's subscription."""
        if not self.stripe_subscription_id:
            raise ValueError("Stripe subscription ID is required to cancel a subscription.")
        
        stripe.Subscription.delete(self.stripe_subscription_id)
        self.is_active = False
        self.save()
        
    def __str__(self):
        return f"Payment Info for {self.user.email}"

    class Meta:
        verbose_name = "Payment"
        verbose_name_plural = "Payments"
