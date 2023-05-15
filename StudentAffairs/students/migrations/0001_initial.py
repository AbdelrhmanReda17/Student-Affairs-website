# Generated by Django 3.0.14 on 2023-05-15 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='student',
            fields=[
                ('name', models.CharField(max_length=100)),
                ('gpa', models.DecimalField(decimal_places=1, max_digits=12)),
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('img', models.ImageField(upload_to='photos/%y/%m/%d')),
                ('active', models.BooleanField(default=False)),
                ('NationalID', models.IntegerField()),
                ('Data', models.DateField(verbose_name='')),
                ('email', models.EmailField(max_length=254)),
                ('address', models.CharField(max_length=100)),
                ('phonenum', models.DecimalField(decimal_places=0, max_digits=13)),
            ],
        ),
    ]