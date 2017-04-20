from rest_framework import serializers
from course.models import Course, CourseMembership, Lecture

"""
Serializers needed for django REST framework
"""


class CourseSerializer(serializers.ModelSerializer):
    """
    Serializer for Courses
    """
    role = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id', 'code', 'name', 'year', 'term', 'role')

    def get_role(self, obj):
        """
        Get roll for the user to read easy in api

        Parameters
        ----------
        obj : Obj
            Always a Course

        Returns
        -------
        string
            'Student' or 'Instructor'
        """
        return obj.get_role(self.context['request'].user)


class CourseMembershipSerializer(serializers.ModelSerializer):
    """
    Serializer for Courses
    """
    class Meta:
        model = CourseMembership
        fields = ()


class LectureSerializer(serializers.ModelSerializer):
    """
    Serializer for Courses
    """
    course = serializers.PrimaryKeyRelatedField(read_only=True)
    pre_quiz = serializers.PrimaryKeyRelatedField(read_only=True)
    post_quiz = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Lecture
        fields = ('id', 'title', 'course', 'date', 'start_time', 'end_time', 'pre_quiz',
                  'post_quiz')
