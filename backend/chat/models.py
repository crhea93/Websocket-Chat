from django.db import models
from users.models import CustomUser
# Create your models here.


class Message(models.Model):
    """
    Message model containing message content, sender, and date
    """
    sender = models.ForeignKey(CustomUser,
                               on_delete=models.CASCADE)  # Foreign key link to sender
    content = models.CharField(max_length=1000, null=True, blank=True)  # Message content
    date = models.DateTimeField(auto_now_add=True)  # Automatically add current time


class Chat(models.Model):
    """
    Chat model containing the users involved and messages
    """
    users = models.ManyToManyField(CustomUser, blank=False)  # List of users in chat
    messages = models.ManyToManyField(Message, blank=True)  # Ids of message



