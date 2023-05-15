from django.db import models
from django.core.validators import MaxValueValidator

# Create your models here.
class student(models.Model):
    name =  models.CharField(max_length=100)
    gpa = models.DecimalField(max_digits=12, decimal_places=1 , validators=[MaxValueValidator(4)])
    id = models.IntegerField(primary_key=True , validators=[MaxValueValidator(29999999)])
    img = models.ImageField(upload_to='photos/%y/%m/%d')
    active = models.BooleanField(default=False)
    NationalID = models.IntegerField()
    Data = models.DateField((""), auto_now=False, auto_now_add=False)
    email = models.EmailField()
    address = models.CharField(max_length=100)
    phonenum = models.DecimalField(max_digits = 13 , decimal_places=0)
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
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES , default="General")
    level = models.CharField(max_length=1,choices=LEVEL_CHOICES , default="1")

    def __str__(self):
        return self.name
    class Meta:
        ordering = ['id']