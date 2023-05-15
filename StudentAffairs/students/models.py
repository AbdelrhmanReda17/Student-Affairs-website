from django.db import models

# Create your models here.
class student(models.Model):
    name =  models.CharField(max_length=100)
    gpa = models.DecimalField(max_digits=12, decimal_places=1)
    id = models.IntegerField(primary_key=True)
    img = models.ImageField(upload_to='photos/%y/%m/%d')
    active = models.BooleanField(default=False)
    NationalID = models.IntegerField()
    Data = models.DateField((""), auto_now=False, auto_now_add=False)
    email = models.EmailField()
    address = models.CharField(max_length=100)
    phonenum = models.DecimalField(max_digits = 13 , decimal_places=0)