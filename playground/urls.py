from django.urls import path
from . import views

urlpatterns = [
    # path('hello/' , views.say_hello),
    # path('add' , views.add , name= "add"),
    path('login/' , views.login , name= 'login'),
    path('signup/' , views.signup , name= 'signup'),
    path('' , views.index , name= "index"),
    # path('users/' , views.user_try , name= "users"),
    path('users/<try_email>/<try_password>' , views.user_try , name= "users_detail"),
    path('exchange/<user_email>/<user_password>' , views.exchange , name= "exchange"),
    # path('chat' , views.lobby , name= "lobby")
    # path('' , views.lobby , name= "lobby")
    
]