from django.db import models
from django.core.validators import MaxValueValidator

# Create your models here.
class student(models.Model):
    name =  models.CharField(null = False,max_length=100)
    gpa = models.DecimalField(null = False,max_digits=12, decimal_places=1 , validators=[MaxValueValidator(4)])
    student_id = models.IntegerField(unique= True ,null = False,validators=[MaxValueValidator(29999999)])
    img = models.ImageField(null = True, upload_to='photos/%y/%m/%d' , default="static/photos/male.png")
    active = models.BooleanField(null = False,default=False)
    NationalID = models.IntegerField(null = False,)
    date = models.DateField(null = False, auto_now=False, auto_now_add=False)
    email = models.EmailField(null = False,)
    address = models.CharField(null = False,max_length=100)
    phonenum = models.DecimalField(null = False,max_digits = 13 , decimal_places=0)
    DEPARTMENT_CHOICES = [
        ('CS', 'CS'),
        ('IS', 'IS'),
        ('AI', 'AI'),
        ('DS', 'DS'),
        ('General', 'General'),
    ]
    LEVEL_CHOICES = [
        ('1', '1'),
        ('2', '2'),
        ('3', '3'),
        ('4', '4'),
    ]
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    department = models.CharField(null = False,max_length=10, choices=DEPARTMENT_CHOICES , default="General")
    level = models.CharField(null = False,max_length=1,choices=LEVEL_CHOICES , default="1")
    gender = models.CharField(null = False,max_length=10,choices=GENDER_CHOICES , default="Male")
    def __str__(self):
        return self.name
    class Meta:
        ordering = ['id']