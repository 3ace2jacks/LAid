from django.db import models
from django.contrib.auth.models import User

TERMS = (('fall', 'Fall'), ('spring', 'Spring'))


class Course(models.Model):
    """Represents a course found in a university"""

    # The subject code, e.g. "TDT4140"
    code = models.CharField(max_length=16)

    # Name of course, e.g. "Software Engineering"
    name = models.CharField(max_length=128)

    # What users are connected to the course. Students and staff.
    members = models.ManyToManyField(User, through='CourseMembership', related_name='courses')
    year = models.IntegerField()
    term = models.CharField(max_length=16, choices=TERMS)


    # Password required to join the course.
    #password = models.CharField(max_length=32, null=True, default=None)

    def __str__(self):
        return "{} - {}".format(self.code, self.name)


class Lecture(models.Model):
    """Represents a lecture in a course"""
    title = models.CharField(max_length=128)
    course = models.ForeignKey(Course)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.title


# Roles for CourseMembership
MEMBERSHIP_ROLES = (('staff', 'Staff'), ('student', 'Student'))


class CourseMembership(models.Model):
    course = models.ForeignKey(Course)
    user = models.ForeignKey(User)
    role = models.CharField(max_length=32, choices=MEMBERSHIP_ROLES)
