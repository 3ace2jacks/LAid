from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializerWithPassword(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username','password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')