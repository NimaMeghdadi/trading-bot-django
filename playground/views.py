from multiprocessing import context
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404

# def say_hello(request):
#     queryset = Customer.objects.all()
    
#     return render(request,'hello.html', {'name':'Nima' , 'products' : list(queryset)})

def index(request):
    return render(request,'dashboard/index1.html')

def login(request):
    return render(request,'account/login.html' )

def signup(request):
    return render(request,'account/signup.html')

@api_view()
def users(request):
    return Response('ok')
    
@api_view()
def users_detail(request , id):
    # user = Users.objects.get(pk=id)
    user = get_object_or_404(Users, pk=id)
    serializer = UserSerializer(user)
    return Response(serializer.data)