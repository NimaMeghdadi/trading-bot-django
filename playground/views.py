from django.shortcuts import render
from django.http import HttpResponse
from store.models import Customer
# Create your views here.


def say_hello(request):
    queryset = Customer.objects.all()
    
    return render(request,'hello.html', {'name':'Nima' , 'products' : list(queryset)})

def add(request):
    return render(request,'add/add.html')

def index(request):
    return render(request,'add/index.html')

def lobby(request):
    return render(request,'playground/lobby.html')