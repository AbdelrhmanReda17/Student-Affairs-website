from django.shortcuts import render
from .models import student
# Create your views here.
def updatestudent(request):
    return render(request , 'pages/update.html' )

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
    if request.method == 'POST':
        data = request.POST
        name = data.get('Sname')
        date = data.get('date')
        student_id = data.get('id')
        email = data.get('email')
        gpa = data.get('gpa')
        national_id = data.get('nationalid')
        address = data.get('address')
        phone_number = data.get('phonenumber')
        image = request.FILES.get('image')
        level = data.get('Slevel')
        status = data.get('Sstatus')
        gender = data.get('Sgender')
        if (name is not None and date is not None and student_id is not None and email is not None and gpa is not None and national_id is not None and address is not None and phone_number is not None and level is not None and status is not None and gender is not None):
            new_student = student(name=name,date=date,student_id=student_id,email=email,gpa=gpa,NationalID=national_id,address=address,phonenum=phone_number,img=image,level=level,active=status,gender=gender)
            new_student.save()
    return render(request , 'pages/AddStudent.html')

def department(request):
    return render(request , 'pages/departmentprofile.html' , {})