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

# @csrf_exempt
# def uploadImage(request):
#     if request.method == 'POST' and request.FILES.get('file'):
#         image_file = request.FILES['file']
#         current_date = datetime.now().strftime('%y/%m/%d')  # Use uppercase Y for a 4-digit year
#         image_filename = image_file.name.replace(' ', '_')  # Replace backslashes with forward slashes
#         image_directory = os.path.join('\media\photos', current_date)  # Use 'photo' instead of 'photos'
#         image_directory = image_directory.replace('\\', '/')
#         # Create the directory if it doesn't exist
#         os.makedirs(image_directory, exist_ok=True)
#         print(image_directory)

#         fs = FileSystemStorage(location=image_directory)
#         image_path = fs.save(image_filename, image_file)
#         # Provide the image path relative to the root URL
#         media_url = settings.MEDIA_URL
#         image_url = os.path.join(image_directory,image_path)
#         response = {'image_path': image_url}
#         print(response)
#         return JsonResponse(response, status=200)
#     else:
#         response = {'error': 'Invalid request method or file not found'}
#         return JsonResponse(response, status=400)
        
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
            data = json.loads(request.body)
            old_student_id = data.get('myParam')
            img = data.get('img')
            updated_data = {
                'name': data.get('name'),
                'student_id': data.get('id'),
                'gpa': data.get('gpa'),
                'email': data.get('email'),
                'NationalID': data.get('national_id'),
                'address': data.get('address'),
                'phonenum': data.get('phone'),
                'date': data.get('date'),
                'department': data.get('department'),
                'level': data.get('level'),
                'gender': data.get('Sgender'),
                'status': data.get('status') == 'Active',
            }
            try:
                student_obj = student.objects.get(student_id=old_student_id)
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
        print(data)
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