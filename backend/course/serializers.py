from rest_framework import serializers
from course.models import Course, Lecture, CourseMembership


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'code', 'name', 'year', 'term')


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ('id', 'title', 'course', 'start_time', 'end_time')

class CourseMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMembership
        fields = ('course', 'user', 'role')