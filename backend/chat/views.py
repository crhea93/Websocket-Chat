from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ChatSerializer
from .models import Chat
# Create your views here


class ChatViewSet(viewsets.ModelViewSet):
    """
    View to expose entire Chatlist to frontend
    """
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()  # Expose all chats
