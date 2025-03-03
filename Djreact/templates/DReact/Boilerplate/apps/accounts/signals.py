from apps.accounts.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.payments.models import Payment


@receiver(post_save, sender=User)
def create_payment_profile(sender, instance, created, **kwargs):
    """Create a Payment profile for the user when a user is created."""
    if created:
        # Create a payment object for the newly created user
        Payment.objects.create(user=instance)
