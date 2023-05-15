from django.shortcuts import render
from .models import student
# Create your views here.
def updatestudent(request):
    return render(request , 'pages/update.html' )

def viewall(request):
    return render(request, 'pages/ViewAllStudents.html', {'students': student.objects.all()})

def inactive(request):
    return render(request, 'pages/inactive.html', {'students': student.objects.all()})

def active(request):
    return render(request, 'pages/active.html', {'students': student.objects.all()})

def addstudent(request):
    return render(request , 'pages/AddStudent.html' , {})

def department(request):
    return render(request , 'pages/departmentprofile.html' , {})