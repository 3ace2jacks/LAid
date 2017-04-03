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
from rest_framework.permissions import IsAuthenticated
import live.permissions as p


class FlowList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated, p.IsStudentOrInstructorReadOnly)

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
    permission_classes = (IsAuthenticated, p.IsLectureInstructor)

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
    permission_classes = (IsAuthenticated, p.IsMember)

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
    permission_classes = (IsAuthenticated, p.IsLectureMember)
    serializer_class = VoteSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, question=LectureQuestion.objects.get(id=self.kwargs['pk']))


class AnswerLiveQuestion(APIView):

    def post(self, request, pk, format=None):
        lecture = LectureQuestion.objects.get(id=pk)
        lecture.answered = True
        lecture.save()
        return Response()
