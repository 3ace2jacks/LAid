from django.db import models
from django.contrib.auth.models import User
from quiz.models import Quiz

# The possible terms a course can be in
# to distinguish courses with same name and course code
TERMS = (
    # The first name is the actual name, the second the human readable version
    ('fall', 'Fall'),
    ('spring', 'Spring'),
    ('summer', 'Summer'),
)

# The roles a user can have in a course
ROLES = (('INSTRUCTOR', 'Instructor'), ('STUDENT', 'Instructor'))



class Course(models.Model):
    """A course is a continous set of lectures that last for some time"""
    # The course code, e.g. TDT4140
    code = models.CharField(max_length=16)
    # The course name, e.g. Software Engineering
    name = models.CharField(max_length=64)
    # The year the course takes place
    year = models.IntegerField()
    # What term this course was held
    term = models.CharField(max_length=16, choices=TERMS)
    # Users that are connected to the course as instructor or student
    members = models.ManyToManyField(User, through='CourseMembership', related_name='courses')

    def __str__(self):
        return "{} - {}".format(self.code, self.name)

    def get_role(self, user):
        """
        Return the role of the given user in the course

        :param user: The user instance to get the role of
        :return: The role of the user. Can be None, "INSTUCTOR" or "STUDENT"
        """

        if CourseMembership.objects.filter(course=self, user=user).exists():
            return CourseMembership.objects.get(course=self, user=user).role
        return None


class CourseMembership(models.Model):
    """Define the roles of users in a course

    Used as a many-to-many relationship between Course and User
    """
    course = models.ForeignKey(Course)
    user = models.ForeignKey(User)
    # The role of the user in the course, instuctor or student
    role = models.CharField(max_length=16, choices=ROLES)



class Lecture(models.Model):
    """A lecture that is part of a course."""
    title = models.CharField(max_length=64)
    course = models.ForeignKey(Course, related_name='lectures')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    pre_quiz = models.ForeignKey(Quiz, related_name='pre_quiz', null=True)
    post_quiz = models.ForeignKey(Quiz, related_name='post_quiz', null=True)

    def __str__(self):
        return self.title
