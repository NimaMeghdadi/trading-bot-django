from django.db import models

class Users(models.Model):
    first_name =models.CharField(max_length=255 , default="")
    last_name= models.CharField(max_length=255, default="")
    Email = models.CharField(max_length=255, default="")
    password = models.CharField(max_length=255, default="")
    money = models.IntegerField()
    bitcoin = models.IntegerField()

