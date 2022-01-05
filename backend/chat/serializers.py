from rest_framework import serializers
from chat.models import Chat


class ChatSerializer(serializers.ModelSerializer):
    """
    Serializer class for Chat
    """
    class Meta:
        model = Chat
        fields = '__all__'  # Import all fields!