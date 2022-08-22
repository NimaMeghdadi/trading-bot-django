import email
from multiprocessing import context
from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
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

@api_view(['GET','POST'])
def users(request):
    if request.method == 'GET':
        user = Users.objects.all()
        serializer = UserSerializer(user , many = True , context={'request':request})
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer.validated_data)
        return Response('ok')
    
@api_view(['GET','POST'])
def users_detail(request , id):
    # user = Users.objects.get(pk=id)
    # if request.method == 'GET':
    user = get_object_or_404(Users, email=id)
    serializer = UserSerializer(user)
    return Response(serializer.data)
    # elif request.method == 'POST':
    #     serializer = UserSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.validated_data
    #     return Response('ok')
        # else:
        #     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)