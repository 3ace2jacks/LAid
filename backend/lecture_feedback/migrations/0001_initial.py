# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-13 14:11
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course', '0002_auto_20170226_1523'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LectureFlow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_stamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('flow', models.CharField(choices=[('slow', 'Slow'), ('fast', 'Fast')], max_length=16)),
                ('lecture_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.Lecture')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
