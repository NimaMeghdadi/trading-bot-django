from django.db import models

class Users(models.Model):
    first_name:models.CharField(max_length=255)
    last_name:models.CharField(max_length=255)
    Email:models.EmailField(max_length=255)
    password:models.CharField(max_length=255)
        
