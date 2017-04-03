from rest_framework import permissions
from course.models import CourseMembership, Course, Lecture
from live.models import LectureQuestion

class IsStudentOrInstructorReadOnly(permissions.BasePermission):
    """
    Global permission check for blacklisted IPs.
    """

    def has_permission(self, request, view):
        if request.method == 'GET':
            return Lecture.objects.get(id=view.kwargs['pk']).course.get_role(request.user)
        return Lecture.objects.get(id=view.kwargs['pk']).course.get_role(request.user) == 'STUDENT'


class IsLectureInstructor(permissions.BasePermission):
    """
    Global permission check for blacklisted IPs.
    """

    def has_permission(self, request, view):
        return Lecture.objects.get(id=view.kwargs['pk']).course.is_instructor(request.user)


class IsMember(permissions.BasePermission):
    """
    Global permission check for blacklisted IPs.
    """

    def has_permission(self, request, view):
        return Lecture.objects.get(id=view.kwargs['pk']).course.get_role(request.user)


class IsLectureMember(permissions.BasePermission):
    """
    Global permission check for blacklisted IPs.
    """

    def has_permission(self, request, view):
        return LectureQuestion.objects.get(id=view.kwargs['pk']).lecture.course.get_role(
            request.user)
