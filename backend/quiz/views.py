from django.shortcuts import render
from quiz.models import Quiz
from rest_framework import generics
from quiz.serializers import QuizStudentSerializer



class QuizList(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizStudentSerializer


class QuizStudentDetail(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizStudentSerializer