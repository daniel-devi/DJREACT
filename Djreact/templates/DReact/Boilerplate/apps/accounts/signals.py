from apps.accounts.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.payments.models import Payment
from allauth.account.signals import user_signed_up
from allauth.account.models import EmailAddress


@receiver(post_save, sender=User)
def create_payment_profile(sender, instance, created, **kwargs):
    """Create a Payment profile for the user when a user is created."""
    if created:
        # Create a payment object for the newly created user
        Payment.objects.create(user=instance)


@receiver(user_signed_up)
def verify_email_on_signup(request, user, **kwargs):
    email = user.email
    email_address, created = EmailAddress.objects.get_or_create(
        user=user,
        email=email,
        defaults={"verified": True, "primary": True}
    )
    if not created:
        email_address.verified = True
        email_address.primary = True
        email_address.save()
