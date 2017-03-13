from rest_framework import serializers
from lecture_feedback.models import LectureFlow, Question, Vote
import django_filters
from rest_framework import filters


class FlowSerializer(serializers.ModelSerializer):
    time_stamp = serializers.DateTimeField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = LectureFlow
        fields = ('user', 'time_stamp', 'flow')


class FlowFilter(filters.FilterSet):
    time_stamp = django_filters.DateTimeFilter(name="time_stamp", lookup_expr='gte')
    class Meta:
        model = LectureFlow
        fields = ['time_stamp']


class VoteSerializer(serializers.ModelSerializer):
    time_stamp = serializers.DateTimeField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    lecture = serializers.PrimaryKeyRelatedField(read_only=True)
    question = serializers.CharField(read_only=True)
    class Meta:
        model = Vote
        fields = ('user', 'question', 'lecture', 'time_stamp', 'vote')


class QuestionSerializer(serializers.ModelSerializer):
    time_stamp = serializers.DateTimeField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    votes = VoteSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ('id', 'user', 'time_stamp', 'question', 'votes')
