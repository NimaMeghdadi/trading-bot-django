from dataclasses import fields
from unittest.util import _MAX_LENGTH
from rest_framework import serializers

from playground.models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        # fields = ['id','email','first_name','last_name','money','bitcoin']
        fields = '__all__'
class UserSerializerSignup(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['email','password']