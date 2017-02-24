from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIRequestFactory
from django.contrib.auth.models import User
from accounts.views import UserRegister
import json

class UrlUserRegisterTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = UserRegister.as_view()

    def test_url_register(self):
        """URL input gives right HTTP response for '/user/register/'"""
        url = reverse('register')
        self.assertEqual(url, '/user/register/')

    def test_new_user(self):
        """Crate and delete new user"""
        self.assertEqual(User.objects.count(), 0)
        nikolay = {'username': 'Nikolai',
                   "password": "Thea",
                   "email": "nei@jegHeter.nikolai",
                   "first_name": "Nikolay",
                   "last_name": "Thea"
                   }
        thea = {'username': 'Thea',
                "password": "nikolay",
                "email": "sur@unge.jada",
                "first_name": "Thea",
                "last_name": "Nikolay"
                }
        martin = {'username': 'Martin',
                  "password": "fjærn",
                  "email": "boss@boss.boss",
                  "first_name": "Martin",
                  "last_name": "VIP"
                  }
        request = self.factory.post('register', json.dumps(nikolay),
                                    content_type='application/json')
        self.view(request)
        self.assertEqual(User.objects.count(), 1)
        request = self.factory.post('register', json.dumps(thea),
                                    content_type='application/json')
        self.view(request)
        self.assertEqual(User.objects.count(), 2)
        request = self.factory.post('register', json.dumps(martin),
                                    content_type='application/json')
        self.view(request)
        self.assertEqual(User.objects.count(), 3)

        for user in User.objects.get_queryset():
            user.delete()
        self.assertEqual(User.objects.count(), 0)
