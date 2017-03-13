from django.db import models
from django.contrib.auth.models import User
from course.models import Lecture
from django.utils.timezone import now


TERMS = (('slow', 'Slow'), ('fast', 'Fast'))


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


