from datetime import datetime
from django.shortcuts import render
from .models import student
import logging
import json
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from django.conf import settings

# Create your views here.
logger = logging.getLogger(__name__)

def getStudents(request):
    try:
        students = student.objects.values()  # Get all student instances and their values
        return JsonResponse({'students': list(students)})  # Convert queryset to a list of dictionaries and return as JSON
    except Exception as e:
        logger.error('Error occurred in getStudents view: %s', str(e))
        return JsonResponse({'error': 'An error occurred'}, status=500)

@csrf_exempt
def setStudents(request):
    if request.method == 'POST':
        try:
            data = request.POST
            old_student_id = data.get('myParam')
            img = request.FILES.get('photo')
            print(img)
            updated_data = {
                'name': data.get('name'),
                'student_id': data.get('id'),
                'gpa': data.get('gpa'),
                'email': data.get('email'),
                'NationalID': data.get('nationalId'),
                'address': data.get('address'),
                'phonenum': data.get('phone'),
                'date': data.get('date'),
                'department': data.get('department'),
                'level': data.get('level'),
                'gender': data.get('gender'),
                'status': data.get('status') == 'Active',
            }
            try:
                student_obj = student.objects.get(student_id=old_student_id)
                if(img is not None):
                    student_obj.img = img
                for key, value in updated_data.items():
                    setattr(student_obj, key, value)
                student_obj.save()
                response = {'message': 'Student updated successfully'}
                return JsonResponse(response, status=200)
            except student.DoesNotExist:
                response = {'error': 'Student not found'}
                return JsonResponse(response, status=404)
        except Exception as e:
            response = {'error': 'An error occurred while updating the student'}
            return JsonResponse(response, status=500)
    else:
        response = {'error': 'Invalid request method'}
        return JsonResponse(response, status=405)

def updatestudent(request):
    students = student.objects.all().order_by('id')
    return render(request , 'pages/update.html', {'students': students})

def viewall(request):
    students = student.objects.all().order_by('id')
    return render(request, 'pages/ViewAllStudents.html', {'students': students})

def inactive(request):
    inactive_students = student.objects.filter(active=False).order_by('id')
    return render(request, 'pages/inactive.html', {'students': inactive_students})

def active(request):
    active_students = student.objects.filter(active=True).order_by('id')
    return render(request, 'pages/active.html', {'students': active_students})

def addstudent(request):
    return render(request , 'pages/AddStudent.html');

def uploadstudent(request):
    if request.method == 'POST':
        image22 = request.FILES.get('photo')
        data = request.POST
        name = data.get('name')
        date = data.get('date')
        student_id = data.get('id')
        email = data.get('email')
        gpa = data.get('gpa')
        national_id = data.get('nationalId')
        address = data.get('address')
        phone_number = data.get('phone')
        print(image22)
        level = data.get('level')
        status = data.get('status')
        gender = data.get('gender')
        if (name is not None and date is not None and student_id is not None and email is not None and gpa is not None and national_id is not None and address is not None and phone_number is not None and level is not None and status is not None and gender is not None):
            new_student = student(name=name,date=date,student_id=student_id,email=email,gpa=gpa,NationalID=national_id,address=address,phonenum=phone_number,img=image22,level=level,active=status,gender=gender)
            new_student.save()

            return JsonResponse({'message': 'Student added successfully'})
        return JsonResponse({'error': 'Invalid form data'})

def department(request):
    return render(request , 'pages/departmentprofile.html' , {})

def delete_student(request):
    if request.method == 'GET':
        student_id = request.GET.get('id')
        if(student_id is not None):
            student_obj = student.objects.get(id=student_id)
            student_obj.delete()
            return JsonResponse({'message': 'Student added successfully'})
    return JsonResponse({'error': 'Invalid form data'})
   