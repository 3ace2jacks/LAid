from rest_framework import serializers
from lecture_feedback.models import LectureFlow


class FlowSerializer(serializers.ModelSerializer):
    time_stamp = serializers.DateTimeField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = LectureFlow
        fields = ('user', 'time_stamp', 'flow')


import django_filters
from rest_framework import filters


class FlowFilter(filters.FilterSet):
    time_stamp = django_filters.DateTimeFilter(name="time_stamp", lookup_expr='gte')
    class Meta:
        model = LectureFlow
        fields = ['time_stamp']
