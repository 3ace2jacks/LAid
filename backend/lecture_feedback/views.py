from rest_framework.exceptions import APIException
from lecture_feedback.models import LectureFlow
from lecture_feedback.serializers import FlowSerializer, FlowFilter, QuestionSerializer, VoteSerializer
from rest_framework import generics
from lecture_feedback.models import LectureFlow, Question
from course.models import Lecture
from django_filters import rest_framework as filters



class FlowList(generics.ListCreateAPIView):
    # http://localhost:8000/lecture/3/flow/?time_stamp=2017-03-13%2017:10:10
    serializer_class = FlowSerializer
    filter_class = FlowFilter
    filter_backends = (filters.DjangoFilterBackend,)
    # queryset = LectureFlow.objects.all()
    def get_queryset(self):
        try:
            return LectureFlow.objects.filter(lecture=Lecture.objects.get(id=self.kwargs['pk']))
        except:
            raise APIException("No votes found..")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, lecture=Lecture.objects.get(id=self.kwargs[
            'pk']))


class QuestionList(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    def get_queryset(self):
        try:
            return Question.objects.filter(lecture=Lecture.objects.get(id=self.kwargs['pk']))
        except:
            raise APIException("No questions found..")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, lecture=Lecture.objects.get(id=self.kwargs[
            'pk']))


class VoteList(generics.CreateAPIView):
    serializer_class = VoteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, question=Question.objects.get(id=self.kwargs[
            'lk']), lecture=Lecture.objects.get(id=self.kwargs['pk']), )