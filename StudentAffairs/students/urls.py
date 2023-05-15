from django.urls import path
from . import views

urlpatterns = [
   path('viewall/' , views.viewall , name='allstudents'),
   path('updatestudent/',views.updatestudent , name ='updatestudent'),     
   path('viewinactive/', views.inactive , name='inactive'),
   path('viewactive/', views.active , name='active'),
   path('addstudent/', views.addstudent , name='addstudent'),
   path('departmentprofile/', views.department , name='department'),
]
    