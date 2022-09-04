from django.urls import path
from . import views

urlpatterns = [
    path('login/' , views.login , name= 'login'),
    path('signup/' , views.signup , name= 'signup'),
    path('future/' , views.future , name= 'future'),
    path('' , views.index , name= "index"),
    path('users/<try_email>/<try_password>' , views.user_try , name= "users_detail"),
    path('exchange/<user_email>/<user_password>' , views.exchange , name= "exchange"),
]