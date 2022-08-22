from unicodedata import decimal
from django.db import models

class Users(models.Model):
    first_name =models.CharField(max_length=255 , default="")
    last_name= models.CharField(max_length=255, default="")
    email = models.EmailField(max_length=255, default="")
    password = models.CharField(max_length=255, default="")
    money = models.DecimalField(max_digits=8, decimal_places=2,  default=0)
    bitcoin = models.DecimalField(max_digits=10, decimal_places=6, default=0)

