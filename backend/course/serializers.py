from rest_framework import serializers
from course.models import Course, CourseMembership, Lecture

class CourseSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id', 'code', 'name', 'year', 'term', 'role')

    def get_role(self, obj):
        return obj.get_role(self.context['request'].user)


class CourseMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMembership
        fields = ()


class LectureSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(read_only=True)
    pre_quiz = serializers.PrimaryKeyRelatedField(read_only=True)
    post_quiz = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Lecture
        fields = ('id', 'title', 'course', 'date', 'start_time', 'end_time', 'pre_quiz', 'post_quiz')