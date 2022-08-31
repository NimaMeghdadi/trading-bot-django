from unicodedata import decimal
from django.db import models

class Users(models.Model):
    first_name =models.CharField(max_length=255 , null= True)
    last_name= models.CharField(max_length=255,  null= True)
    email = models.EmailField(max_length=255, default="", unique=True)
    password = models.CharField(max_length=255, default="")
    binance_money = models.DecimalField(max_digits=10, decimal_places=2,null= True)
    binance_bitcoin = models.DecimalField(max_digits=10, decimal_places=6, null= True)
    huobi_money = models.DecimalField(max_digits=10, decimal_places=2,null= True)
    huobi_bitcoin = models.DecimalField(max_digits=10, decimal_places=6, null= True)

