from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Feedback(models.Model):
    FEEDBACK_TYPE_CHOICES = [
        ('suggestion', 'Suggestion'),
        ('complaint', 'Complaint'),
        ('question', 'Question'),
        ('praise', 'Praise'),
        ('other', 'Other'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    feedback_type = models.CharField(max_length=20, choices=FEEDBACK_TYPE_CHOICES, default='other')
    message = models.TextField()
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)  # Rating scale from 1 to 5
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('resolved', 'Resolved')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Feedback from {self.user.email if self.user else 'Anonymous'} - {self.get_feedback_type_display()}"

    class Meta:
        verbose_name = "Feedback"
        verbose_name_plural = "Feedbacks"
        ordering = ['-created_at']  # Sort feedback by newest first
