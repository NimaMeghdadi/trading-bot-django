from multiprocessing import context
from django.shortcuts import render
from django.http import HttpResponse
# from store.models import Customer
from json import dumps
# Create your views here.


# def say_hello(request):
#     queryset = Customer.objects.all()
    
#     return render(request,'hello.html', {'name':'Nima' , 'products' : list(queryset)})

# def add(request):
#     return render(request,'add/add.html')

def index(request):
    dataDictionary = {
        'hello': 'World',
        'geeks': 'forgeeks',
        'ABC': 123,
        456: 'abc',
        14000605: 1,
        'list': ['geeks', 4, 'geeks'],
        'dictionary': {'you': 'can', 'send': 'anything', 3: 1}
    }
    # dump data
    dataJSON = dumps(dataDictionary)
    return render(request,'dashboard/index.html' , context={"data":dataJSON})

# def lobby(request):
#     data = 1
#     context = {'data':data }
#     return render(request,'playground/lobby.html' , context)