from rest_framework import serializers
from live.models import LectureFlow, LectureQuestion, Vote
import django_filters
from rest_framework import filters


class FlowSerializer(serializers.ModelSerializer):
    '''Returns the fields to the api'''
    time_stamp = serializers.DateTimeField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = LectureFlow
        fields = ('user', 'time_stamp', 'flow')


class FlowFilter(filters.FilterSet):
    '''Gives the possibility to only return votes after a time
    eg.: http://localhost:8000/lecture/3/flow/?time_stamp=2017-03-13%2017:10:10
    returns only votes after 2017-03-13%2016:10:10'''
    time_stamp = django_filters.DateTimeFilter(name="time_stamp", lookup_expr='gte')
    class Meta:
        model = LectureFlow
        fields = ['time_stamp']


class VoteSerializer(serializers.ModelSerializer):
    '''Forces the user to only post the vote for a LectureQuestion'''
    time_stamp = serializers.DateTimeField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    question = serializers.CharField(read_only=True)
    class Meta:
        model = Vote
        fields = ('user', 'question', 'time_stamp', 'vote')


class LectureQuestionSerializer(serializers.ModelSerializer):
    '''Serialize LectureQuestion with nested votes'''
    time_stamp = serializers.DateTimeField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    upvotes = serializers.SerializerMethodField(read_only=True)
    downvotes = serializers.SerializerMethodField(read_only=True)
    has_voted = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = LectureQuestion
        fields = ('id', 'user', 'time_stamp', 'question', 'upvotes', 'downvotes', 'has_voted', 'answered')

    def get_upvotes(self, obj):
        return Vote.objects.filter(question=obj, vote="up").count()

    def get_downvotes(self, obj):
        return Vote.objects.filter(question=obj, vote="down").count()

    def get_has_voted(self, obj):
        return Vote.objects.filter(question=obj, user=self.context['request'].user).exists()