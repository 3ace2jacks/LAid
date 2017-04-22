from rest_framework import permissions
from quiz.models import Quiz
from course.models import Lecture


class IsInstructor(permissions.BasePermission):
    """
    Gives permission to Instructors in the Lecture
    """

    def has_permission(self, request, view):
        """
        Checks if the request comes from a instructor enrolled in Lecture

        Parameters
        ----------
        request : Obj
         The HTTP request
        view : Obj
         The django view

        Returns
        -------
        bool
         True if the request comes from a instructor enrolled in Lecture
         False otherwise
        """
        lecture_id = request.data['lectureID']
        return Lecture.objects.get(id=lecture_id).course.get_role(request.user) == 'INSTRUCTOR'


class IsMember(permissions.BasePermission):
    """
    Gives permission to members in the Lecture the quiz is
    """

    def has_permission(self, request, view):
        """
        Checks if the request comes from a user enrolled in Course

        Parameters
        ----------
        request : Obj
         The HTTP request
        view : Obj
         The django view

        Returns
        -------
        bool (returning anything other than False = True (ish))
         True if the request comes from a user enrolled in Course
         False otherwise
        """
        return Quiz.objects.get(id=view.kwargs['pk']).get_role(request.user)


class IsStudentInLecture(permissions.BasePermission):
    """
    Gives permission to students in Lecture
    """

    def has_permission(self, request, view):
        """
        Checks if the request comes from a student enrolled in Course

        Parameters
        ----------
        request : Obj
         The HTTP request
        view : Obj
         The django view

        Returns
        -------
        bool (returning anything other than False = True (ish))
         True if the request comes from a student enrolled in Course
         False otherwise
        """
        lecture_id = request.data['quizID']
        return Lecture.objects.get(id=int(lecture_id)).course.get_role(request.user) == 'STUDENT'
