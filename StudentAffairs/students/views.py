from django.shortcuts import render
from .models import student
# Create your views here.
def student(request):
    return render(request , 'pages/update.html' )

def students(request):
    return render(request, 'pages/ViewAllStudents.html', {'students': student.objects.all()})
