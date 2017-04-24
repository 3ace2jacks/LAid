from course.serializers import CourseSerializer, CourseMembershipSerializer, LectureSerializer
from rest_framework import generics
from course.models import Course, CourseMembership, Lecture
from rest_framework.permissions import IsAuthenticated
import course.permissions as p


class UserCourseList(generics.ListCreateAPIView):
    """
    Return a list of all the courses the current user is a member of.

    Authentication is required
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        """
        Creates a Course and sets the user to instructor
        the method does not returns anything, Django handles errors

        Parameters
        ----------
        serializer : Obj
            The serializer to save to the database
        """

        course = serializer.save()
        cm = CourseMembership.objects.create(course=course, user=self.request.user,
                                             role='INSTRUCTOR')
        cm.save()

    def get_queryset(self):
        """
        Returns the courses for the user

        Returns
        -------
        list
            list with all the Course objects
        """
        return self.request.user.courses


class AvailableCourseList(generics.ListAPIView):
    """
    Return a list of all the courses the current user is NOT a member of.

    Authentication is required
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = CourseSerializer

    def get_queryset(self):
        """
        Returns the available courses for the user

        Returns
        -------
        list
            list with all the Course objects the user is NOT member in
        """
        return Course.objects.exclude(id__in=self.request.user.courses.values_list('id',
                                                                                   flat=True))


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Return the course information of the course with the id in the url.

    Authentication is required
    """
    permission_classes = (IsAuthenticated, p.IsCourseInstructor,)
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class JoinCourse(generics.CreateAPIView):
    """
    Adds the request user as a student to the course. Course id is retrieved from the url.

    Authentication is required
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = CourseMembershipSerializer

    def perform_create(self, serializer):
        """
        Creates a CourseMembership and sets the user to student
        the method does not returns anything, Django handles errors

        Parameters
        ----------
        serializer : Obj
            The serializer to save to the database
        """
        cm = CourseMembership.objects.create(course=Course.objects.get(id=self.kwargs['pk']),
                                             user=self.request.user, role='STUDENT')
        cm.save()


class CourseLectureList(generics.ListCreateAPIView):
    """
    Return a list of all the lectures in the course

    Authentication is required
    """
    permission_classes = (IsAuthenticated, p.IsCourseInstructorOrStudent)

    serializer_class = LectureSerializer

    def perform_create(self, serializer):
        """
        Creates a Lecture
        the method does not returns anything, Django handles errors

        Parameters
        ----------
        serializer : Obj
            The serializer to save to the database
        """
        serializer.save(course=Course.objects.get(pk=self.kwargs['pk']))

    def get_queryset(self):
        """
        Returns the Lectures in the Course

        Returns
        -------
        list
            list with all the Lecture objects
        """
        return Lecture.objects.filter(course=self.kwargs['pk'])


class LectureDetail(generics.RetrieveAPIView):
    """
    Return the course information of the course with the id in the url.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
