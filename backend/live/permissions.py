from rest_framework import permissions
from course.models import Lecture
from live.models import LectureQuestion

"""
The classes is very similar, the difference is where the methods "starts" looking for user role
e.g. Lecture vs LectureQuestion
"""


class IsStudentOrInstructorReadOnly(permissions.BasePermission):
    """
    Gives read permission for students and instructor in Course and read and write permission for
    students
    """

    def has_permission(self, request, view):
        """
        Checks if the request comes from a instructor, or student

        Parameters
         ----------
         request : Obj
             The HTTP request
         view : Obj
             The django view

         Returns
         -------
         bool
             True if the request comes from a student of the course
             True if the request method is GET and comes from a user enrolled in class
             False otherwise
         """
        if request.method == 'GET':
            return Lecture.objects.get(id=view.kwargs['pk']).course.get_role(request.user)
        return Lecture.objects.get(id=view.kwargs['pk']).course.get_role(request.user) == 'STUDENT'


class IsLectureInstructor(permissions.BasePermission):
    """
    Gives permission to Lectures for instructor
    """

    def has_permission(self, request, view):
        """
         checks if the request comes from a member enrolled in Course

         Parameters
         ----------
         request : Obj
             The HTTP request
         view : Obj
             The django view

         Returns
         -------
         bool
             True if the request comes from a member enrolled in Course
             False otherwise
         """
        return Lecture.objects.get(id=view.kwargs['pk']).course.get_role(request.user)


class IsMember(permissions.BasePermission):
    """
    Gives permission to Lectures for users enrolled in Course
    """

    def has_permission(self, request, view):
        """
         checks if the request comes from a member enrolled in Course

         Parameters
         ----------
         request : Obj
             The HTTP request
         view : Obj
             The django view

         Returns
         -------
         bool
             True if the request comes from a member enrolled in Course
             False otherwise
         """
        return Lecture.objects.get(id=view.kwargs['pk']).course.get_role(request.user)


class IsLectureMember(permissions.BasePermission):
    """
    Gives permission to LectureQuestion for users enrolled in Course
    """

    def has_permission(self, request, view):
        """
         Checks if the request comes from a member enrolled in Course

         Parameters
         ----------
         request : Obj
             The HTTP request
         view : Obj
             The django view

         Returns
         -------
         bool
             True if the request comes from a member enrolled in Course
             False otherwise
         """
        return LectureQuestion.objects.get(id=view.kwargs['pk']).lecture.course.get_role(
            request.user)


class IsQuestionInstructor(permissions.BasePermission):
    """
    Gives permission to LectureQuestion for instructor in Lecture
    """

    def has_permission(self, request, view):
        """
         Checks if the request comes from a instructor enrolled in Course

         Parameters
         ----------
         request : Obj
             The HTTP request
         view : Obj
             The django view

         Returns
         -------
         bool
             True if the request comes from a instructor enrolled in Course
             False otherwise
         """
        return LectureQuestion.objects.get(id=view.kwargs['pk']).lecture.course.is_instructor(
            request.user)
