from django.db import models
from django.contrib.auth.models import User
from course.models import Lecture


# The first name is the actual name, the second the human readable version
TERMS = (('slow', 'Slow'), ('fast', 'Fast'))
VOTES = (('up', 'Up'), ('down', 'Down'))


class LectureFlow(models.Model):
    """
    Represents a Users input on the flow of the lecture
    """
    user = models.ForeignKey(User)
    lecture = models.ForeignKey(Lecture)
    time_stamp = models.DateTimeField(auto_now=True)
    # What the user submitted either slow or fast
    flow = models.CharField(max_length=16, choices=TERMS)

    def __str__(self):
        return "{} - {}".format(self.lecture_id, self.flow)


class LectureQuestion(models.Model):
    """
    Represent a student question in a lecture
    """
    user = models.ForeignKey(User)
    lecture = models.ForeignKey(Lecture)
    time_stamp = models.DateTimeField(auto_now=True)
    question = models.TextField()
    answered = models.BooleanField(default=False)

    def __str__(self):
        return self.question


class Vote(models.Model):
    """
    Represent a students vote on a LectureQuestion
    """
    user = models.ForeignKey(User)
    question = models.ForeignKey(LectureQuestion, related_name='votes')
    time_stamp = models.DateTimeField(auto_now_add=True)
    vote = models.CharField(max_length=10, choices=VOTES)
