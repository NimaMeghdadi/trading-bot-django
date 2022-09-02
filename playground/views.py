import email
from multiprocessing import context
from urllib import response
from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Users
from .serializers import UserSerializer
from .serializers import UserSerializerSignup
# from .serializers import UserSerializerexchange
from django.shortcuts import get_object_or_404


def index(request):
    return render(request,'dashboard/index1.html')

def future(request):
    return render(request,'future.html')

def login(request):
    return render(request,'account/login.html' )

def signup(request):
    return render(request,'account/signup.html')

@api_view()
def users(request):
    user = Users.objects.all()
    serializer = UserSerializer(user , many = True , context={'request':request})
    return Response(serializer.data)

    
@api_view(['GET','POST'])
def user_try(request , try_email,try_password):
    if request.method == 'GET':
        user = get_object_or_404(Users, email=try_email , password = try_password)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserSerializerSignup(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print(serializer.validated_data)
        return Response('ok')

@api_view(['GET','PUT'])
def exchange(request,user_email,user_password):
    user = get_object_or_404(Users, email=user_email , password = user_password)
    if request.method == 'GET':
        serializer = UserSerializer(user)
    elif request.method == 'PUT':
        print(request.data)
        serializer = UserSerializer(user,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("ok")

