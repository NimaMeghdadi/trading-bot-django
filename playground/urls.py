from django.urls import path
from . import views

urlpatterns = [
    # path('hello/' , views.say_hello),
    # path('add' , views.add , name= "add"),
    path('login/' , views.login , name= 'login'),
    path('signup/' , views.signup , name= 'signup'),
    path('' , views.index , name= "index"),
    path('users/' , views.users , name= "users"),
    path('users/<id>/' , views.users_detail , name= "users_detail"),
    # path('chat' , views.lobby , name= "lobby")
    # path('' , views.lobby , name= "lobby")
    
]