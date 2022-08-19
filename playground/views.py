from multiprocessing import context
from django.shortcuts import render
from django.http import HttpResponse
# from store.models import Customer
from json import dumps
# Create your views here.


# def say_hello(request):
#     queryset = Customer.objects.all()
    
#     return render(request,'hello.html', {'name':'Nima' , 'products' : list(queryset)})

def index(request):
    return render(request,'dashboard/index1.html')

def login(request):
    return render(request,'account/login.html' )

def signup(request):
    return render(request,'account/signup.html')