# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-26 14:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionanswer',
            name='question',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='quiz.Question'),
            preserve_default=False,
        ),
    ]
