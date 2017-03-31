from quiz.models import Quiz, QuestionAnswer
from rest_framework import generics
from quiz.serializers import QuizSerializer, QuestionAnswerSerializer

class QuizCreate(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuizDetail(generics.RetrieveAPIView):
    """Return the course information of the course with the id in the url."""
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class AnswerQuestion(generics.ListCreateAPIView):
    queryset = QuestionAnswer.objects.all()
    serializer_class = QuestionAnswerSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)