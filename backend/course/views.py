from course.models import Course, Lecture
from course.serializers import CourseSerializer, LectureSerializer
from rest_framework import generics
from rest_framework import permissions


class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        serializer.save()


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    




class LectureList(generics.ListCreateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer

    def perform_create(self, serializer):
        serializer.save()
