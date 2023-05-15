from django.urls import path
from . import views

urlpatterns =[
    path('', views.home , name='home'),
    path('home/', views.index , name='Index'),
    path('addstudent/', views.addstudent , name='addstudent'),
    path('departmentprofile/', views.department , name='department'),
]