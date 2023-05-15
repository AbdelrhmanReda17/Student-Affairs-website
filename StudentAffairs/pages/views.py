from django.shortcuts import render
# Create your views here.

def index(request):
    return render(request , 'pages/index.html' ,{
    })
def home(request):
    return render(request , 'pages/home.html' ,{
    })
def addstudent(request):
    return render(request , 'pages/AddStudent.html' , {
        })

def department(request):
    return render(request , 'pages/departmentprofile.html' , {
        })