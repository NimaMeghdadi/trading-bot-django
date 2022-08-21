from unittest.util import _MAX_LENGTH
from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    Email = serializers.CharField(max_length=255)
    first_name = serializers.CharField(max_length = 255)
    last_name = serializers.CharField(max_length = 255)