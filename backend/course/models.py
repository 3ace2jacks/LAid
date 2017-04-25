from django.db import models
from django.contrib.auth.models import User


# The possible terms a course can be
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
    """
    A course is a continuous set of lectures that last for some time
    """

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

        Parameters
        ----------
        user : Obj
            The user enrolled in the course

        Returns
        -------
        str
            "INSTUCTOR" or "STUDENT"

        None
            if the user is not enrolled in the course
        """

        if CourseMembership.objects.filter(course=self, user=user).exists():
            return CourseMembership.objects.get(course=self, user=user).role
        return None

    def is_instructor(self, user):
        """
        Checks if user is instructor in the course

        Parameters
        ----------
        user : Obj
            The user enrolled in the course

        Returns
        -------
        bool
            True if user is instructor
            False if user is not instructor or not enrolled in class
        """
        return self.get_role(user) == 'INSTRUCTOR'


class CourseMembership(models.Model):
    """
    Define the roles of users in a course

    Used as a many-to-many relationship between Course and User
    """
    course = models.ForeignKey(Course)
    user = models.ForeignKey(User)
    # The role of the user in the course, instuctor or student
    role = models.CharField(max_length=16, choices=ROLES)


class Lecture(models.Model):
    """
    A lecture that is part of a course.
    """
    title = models.CharField(max_length=64)
    # the course the lecture is part of, if the Course is deleted so is the lecture
    course = models.ForeignKey(Course, related_name='lectures', on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    pre_quiz = models.ForeignKey('quiz.Quiz', related_name='pre_quiz', null=True)
    post_quiz = models.ForeignKey('quiz.Quiz', related_name='post_quiz', null=True)

    def __str__(self):
        return self.title
