from rest_framework import serializers
from course.models import Course, Lecture, CourseMembership
from django.contrib.auth.models import User
from quiz.models import Quiz
from quiz.serializers import QuestionSerializer

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'code', 'name', 'year', 'term')


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ('id', 'title', 'course', 'start_time', 'end_time', 'pre_quiz', 'post_quiz')


class CourseMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMembership
        fields = ()


class CourseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_joined',
                  'last_login', 'is_active', 'password']


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'start_time', 'end_time', 'questions']
