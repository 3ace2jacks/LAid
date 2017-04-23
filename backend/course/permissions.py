from rest_framework import permissions
from course.models import Course


class IsCourseInstructor(permissions.BasePermission):
    """
    Gives read permission for GET and read and write permission for course instructors
    """

    def has_object_permission(self, request, view, obj):
        """
        checks if the request comes from a instructor

        Parameters
        ----------
        request : Obj
            The HTTP request
        view : Obj
            The django view
        obj : Obj
            e.g. Course object

        Returns
        -------
        bool
            True if the request comes from a instructor of the obj
            True if the request method is GET
            False otherwise
        """
        if obj.is_instructor(request.user):
            return True
        if request.method == 'GET':
            return True
        return False


class IsCourseInstructorOrStudent(permissions.BasePermission):
    """
    Gives read permission students in Course and read and write permission for course instructors
    """

    def has_permission(self, request, view):
        """
         checks if the request comes from a instructor, or student

         Parameters
         ----------
         request : Obj
             The HTTP request
         view : Obj
             The django view

         Returns
         -------
         bool
             True if the request comes from a instructor of the course
             True if the request method is GET and comes from a student
             False otherwise
         """
        if request.method == 'GET':
            return Course.objects.get(id=view.kwargs['pk']).get_role(request.user)
        return Course.objects.get(id=view.kwargs['pk']).get_role(request.user) == 'INSTRUCTOR'

    #