from django.db import models
from django.contrib.auth.models import User
from course.models import Lecture
from django.utils.timezone import now


TERMS = (('slow', 'Slow'), ('fast', 'Fast'))
VOTES = (('up', 'Up'), ('down', 'Down'))

class LectureFlow(models.Model):
    """Represents a Users input on the flow of the lecture"""

    # The User
    user = models.ForeignKey(User)

    # The id for the lecture
    lecture = models.ForeignKey(Lecture)

    # When the user submitted
    time_stamp = models.DateTimeField(auto_now=True)

    # What the user submitted
    flow = models.CharField(max_length=16, choices=TERMS)

    def __str__(self):
        return "{} - {}".format(self.lecture_id, self.flow)




class Question(models.Model):
    user = models.ForeignKey(User)
    lecture = models.ForeignKey(Lecture)
    time_stamp = models.DateTimeField(auto_now=True)
    question = models.TextField()

    def __str__(self):
        return self.question


class Vote(models.Model):
    user = models.ForeignKey(User)
    question = models.ForeignKey(Question, related_name='votes')
    lecture = models.ForeignKey(Lecture)
    time_stamp = models.DateTimeField(auto_now=True)
    vote = models.CharField(max_length=10, choices=VOTES)

