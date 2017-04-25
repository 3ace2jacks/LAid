from django.db import models
from django.contrib.auth.models import User
from course.models import Lecture


class Quiz(models.Model):
    """
    Represents a Quiz
    """
    title = models.CharField(max_length=128)
    description = models.TextField(null=True)
    deadline = models.DateTimeField()

    def __str__(self):
        return self.title

    def get_role(self, user):
        """
        Returns the role of a user has in a lecture
        Primly used for security

        Parameters
        ----------
        user : User Obj

        Returns
        -------
        None if the user is not enrolled in the Lecture
        "Student" or "Instructor" otherwise

        """
        if Lecture.objects.filter(pre_quiz=self):
            lecture = Lecture.objects.get(pre_quiz=self)
            return lecture.course.get_role(user)
        if Lecture.objects.filter(post_quiz=self):
            lecture = Lecture.objects.get(post_quiz=self)
            return lecture.course.get_role(user)
        return None


class Question(models.Model):
    """
    Represents a Question
    """
    quiz = models.ForeignKey(Quiz, related_name="questions")
    question = models.TextField()
    answer_description = models.TextField(null=True)

    def __str__(self):
        return self.question


class Option(models.Model):
    """
    Represents a Option
    """
    question = models.ForeignKey(Question, related_name="options")
    text = models.TextField()
    correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text


class QuestionAnswer(models.Model):
    """
    Represents a Question Answer
    """
    question = models.ForeignKey(Question, related_name="answers")
    choice = models.ForeignKey(Option)
    user = models.ForeignKey(User)
