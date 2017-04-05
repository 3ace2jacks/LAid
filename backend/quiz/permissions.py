from rest_framework import permissions
from quiz.models import Quiz
from course.models import Lecture
import json


class IsInstructor(permissions.BasePermission):
    """
    Global permission check for blacklisted IPs.
    """

    def has_permission(self, request, view):
        lecture_id = request.data['lectureID']
        return Lecture.objects.get(id=lecture_id).course.get_role(request.user) == 'INSTRUCTOR'


class IsMember(permissions.BasePermission):
    """
    Global permission check for blacklisted IPs.
    """

    def has_permission(self, request, view):

        return Quiz.objects.get(id=view.kwargs['pk']).get_role(request.user)


class IsStudentInLecture(permissions.BasePermission):
    """
    Global permission check for blacklisted IPs.
    """

    def has_permission(self, request, view):
        lecture_id = request.data['lectureID']
        return Lecture.objects.get(id=int(lecture_id)).course.get_role(request.user) == 'STUDENT'
