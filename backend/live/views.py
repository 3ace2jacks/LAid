from rest_framework.exceptions import APIException
from live.serializers import FlowSerializer, FlowFilter, LectureQuestionSerializer, \
    VoteSerializer
from rest_framework import generics
from live.models import LectureFlow, LectureQuestion, Vote
from course.models import Lecture
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime, timedelta

class FlowList(generics.ListCreateAPIView):
    serializer_class = FlowSerializer
    filter_class = FlowFilter
    filter_backends = (filters.DjangoFilterBackend,)
    def get_queryset(self):
        try:
            return LectureFlow.objects.filter(lecture=Lecture.objects.get(id=self.kwargs['pk']))
        except:
            raise APIException("No votes found..")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, lecture=Lecture.objects.get(id=self.kwargs[
            'pk']))


class FlowCount(APIView):

    def get(self, request, pk, tk=0, format=None):
        if int(tk):
            delta = datetime.now() - timedelta(minutes=int(tk))
        else:
            delta = datetime.now() - timedelta(days=1000)
        to_fast = LectureFlow.objects.filter(lecture=Lecture.objects.get(id=pk),
                                             flow='fast', time_stamp__gte=delta).count()
        to_slow = LectureFlow.objects.filter(lecture=Lecture.objects.get(id=pk),
                                             flow='slow', time_stamp__gte=delta).count()
        flow = {
            'to_fast': to_fast,
            'to_slow': to_slow
        }
        return Response(flow)



class QuestionList(generics.ListCreateAPIView):
    serializer_class = LectureQuestionSerializer
    def get_queryset(self):
        try:
            return LectureQuestion.objects.filter(lecture=Lecture.objects.get(id=self.kwargs['pk']))
        except:
            raise APIException("No questions found..")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, lecture=Lecture.objects.get(id=self.kwargs[
            'pk']))


class VoteList(generics.CreateAPIView):
    serializer_class = VoteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, question=LectureQuestion.objects.get(id=self.kwargs[
            'lk']), lecture=Lecture.objects.get(id=self.kwargs['pk']), )


class VoteCount(APIView):

    def get(self, request, pk, questionId, format=None):

        up_votes = Vote.objects.filter(lecture=Lecture.objects.get(id=pk),
                                       question=LectureQuestion.objects.get(id=questionId),
                                       vote='up').count()
        down_votes = Vote.objects.filter(lecture=Lecture.objects.get(id=pk),
                                       question=LectureQuestion.objects.get(id=questionId),
                                       vote='down').count()
        flow = {
            'up_votes': up_votes,
            'down_votes': down_votes
        }
        return Response(flow)