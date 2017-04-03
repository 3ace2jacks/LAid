from rest_framework import permissions
from course.models import CourseMembership, Course

class IsCourseInstructor(permissions.BasePermission):
    """
    Global permission check for blacklisted IPs.
    """

    # def has_permission(self, request, view):
    #     return request.user.auth

    def has_object_permission(self, request, view, obj):
        if obj.is_instructor(request.user):
            return True
        if request.method == 'GET':
            return True
        return False


class IsLectureInstructor(permissions.BasePermission):
    """
    Global permission check for blacklisted IPs.
    """

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        return Course.objects.get(id=view.kwargs['pk']).is_instructor(request.user)

    #