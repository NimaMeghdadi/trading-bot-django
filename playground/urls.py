from django.urls import path
from . import views

urlpatterns = [
    # path('hello/' , views.say_hello),
    # path('add' , views.add , name= "add"),
    path('' , views.index , name= "index"),
    # path('chat' , views.lobby , name= "lobby")
    # path('' , views.lobby , name= "lobby")
    
]