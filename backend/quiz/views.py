from django.shortcuts import render
from quiz.models import Quiz, QuestionAnswer
from rest_framework import generics
from quiz.serializers import QuizSerializer, AnswerSerializer



class QuizList(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuizStudentDetail(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class AnswerQuiz(generics.ListCreateAPIView):

    serializer_class = AnswerSerializer

    def get_queryset(self):
        return QuestionAnswer.objects.all()