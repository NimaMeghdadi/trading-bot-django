from dataclasses import fields
from unittest.util import _MAX_LENGTH
from rest_framework import serializers

from playground.models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        # fields = ['id','email','first_name','last_name','money','bitcoin']
        fields = '__all__'
        
    # passvalid = serializers.SerializerMethodField(
    #     method_name='nima'
    # )
    
    def nima(self, data):
        pass 
    
    # def validate(self,data):
    #     if data['password']!= data['first_name']:
    #         return serilizers.ValidationError('password wrong')
    #     return data
    # id = serializers.IntegerField()
    # email = serializers.EmailField(max_length=255)
    # first_name = serializers.CharField(max_length = 255)
    # last_name = serializers.CharField(max_length = 255)
    # money = serializers.DecimalField(max_digits=8, decimal_places=2)
    # bitcoin = serializers.DecimalField(max_digits=10, decimal_places=6)
class UserSerializerSignup(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['email','password']
        
# class UserSerializerexchange(serializers.ModelSerializer):
#     class Meta:
#         model = Users
#         fields = ['binance_bitcoin','binance_money','huobi_bitcoin','huobi_money']