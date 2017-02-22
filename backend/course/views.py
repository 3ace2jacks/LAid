from course.models import Course, Lecture
from course.serializers import CourseSerializer, LectureSerializer, CourseMembershipSerializer
from rest_framework import generics
from rest_framework import permissions


class CourseList(generics.ListCreateAPIView):
    """Return a list of all the courses the current user is connected to, as staff or student.

    Authentication is required"""
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        serializer.save()

    def get_queryset(self):
        return self.request.user.courses


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    """Return the course information of the course with the id in the url."""
    queryset = Course.objects.all()
    serializer_class = CourseSerializer



class JoinCourse(generics.CreateAPIView):
    """Adds a user to a course as staff or student. Course id is retrieved form the url. Post should include username and role, either \"staff\" or \"student\""""
    serializer_class = CourseMembershipSerializer



class LectureList(generics.ListCreateAPIView):
    serializer_class = LectureSerializer

    def perform_create(self, serializer):
        serializer.save()

    def get_queryset(self):
        return Lecture.objects.filter(course=self.kwargs['pk'])
