from django.contrib.auth.models import User
from accounts.serializer import UserSerializer, UserSerializerWithPassword
from rest_framework import generics
from rest_framework.permissions import AllowAny



class UserRegister(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializerWithPassword
