from django.test import TestCase, Client
from course.models import Course, Lecture, CourseMembership
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, APIClient
import json
from course.views import UserCourseList
from datetime import date, time


'''To get the sets coverage for course run:
coverage run --source='.' --include='course/*' --omit='*/__init__.py,*/admin.py,*/apps.py,*/migrations/*,*/tests.py' manage.py test course
then:
coverage report --include='course/*' --omit='*/__init__.py,*/admin.py,*/apps.py,*/migrations/*,*/tests.py'
'''

class CourseTestCase(TestCase):
    '''
    Test Course, create, __str__, get_role and the api
    '''
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = UserCourseList.as_view()
        self.client = APIClient()
        self.user = User.objects.create_superuser(username='user',
                                                  email='laid@is.best', password="qwertyuiop")
        self.pu = Course.objects.create(code="TDT4140", name="Programvareutvikling",
                              year=2017, term="fall")
        self.matte1 = Course.objects.create(code="TMA4100", name="Matte 1", year=2017,
                                           term="spring")
        CourseMembership.objects.create(course=self.pu, user=self.user, role="STUDENT")

    def test_course_str(self):
        """Courses correct output __str__"""
        self.assertEqual(self.pu.__str__(), 'TDT4140 - Programvareutvikling')
        self.assertEqual(self.matte1.__str__(), 'TMA4100 - Matte 1')

    def test_course_role(self):
        """Course correct output get_role"""
        self.assertEqual(self.pu.get_role(self.user), 'STUDENT')


    def test_course_api(self):
        """Create courses using REST api
        Not technically required because of django-rest-framework"""

        datdat = {
            "code": "TDT4120",
            "name": "DatDat",
            "year": 2017,
            "term": "spring"
        }
        matte2 = {
            "code": "TMA4105",
            "name": "Matte2",
            "year": 2017,
            "term": "spring"
        }
        self.client.login(username='user', password='qwertyuiop')
        self.assertEqual(CourseMembership.objects.count(), 1)
        response = self.client.post('/courses/member/', json.dumps(datdat),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(CourseMembership.objects.count(), 2)
        response = self.client.post('/courses/member/', json.dumps(matte2),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(CourseMembership.objects.count(), 3)

    def tearDown(self):
        self.client.logout()



class LectureTestCase(TestCase):
    def setUp(self):
        dato = date(2017, 5, 5)
        tid = time()
        self.pu = Course.objects.create(id=1, code="TDT4140", name="Programvareutvikling",
                              year=2017, term='fall')
        self.ad = Lecture.objects.create(id=2, title="Architectural Design",
                                         date=dato, start_time=tid, end_time=tid, course=self.pu)
        self.t = Lecture.objects.create(title="Taylor", date=dato, start_time=tid, end_time=tid,
                                      course=self.pu)

    def test_course_str(self):
        """Lecture correct output __str__"""
        self.assertEqual(self.ad.__str__(), 'Architectural Design')
        self.assertEqual(self.t.__str__(), 'Taylor')



class UrlCoursesTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_superuser(username='user',
                                                  email='laid@is.best', password="qwertyuiop")

    def test_url_courses(self):
        """URL input gives right HTTP response for '/courses/'"""

        url = reverse('member_course_list')
        self.assertEqual(url, '/courses/member/')

        response = self.client.post('/courses/member/')
        self.assertEqual(response.status_code, 403)

        url = reverse('available_course_list')
        self.assertEqual(url, '/courses/available/')

        response = self.client.post('/courses/available/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        response = self.client.get('/courses/member/')
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/courses/available/')
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        self.client.logout()
        self.user.delete()


class UrlLectureListCase(TestCase):
    def setUp(self):
        dato = date(2017, 5, 5)
        tid = time()
        self.client = Client()
        self.user = User.objects.create(username='user', email='laid@is.best')
        self.user.set_password('qwertyuiop')
        self.user.save()
        self.pu = Course.objects.create(id=1, code="TDT4140", name="Programvareutvikling",
                                        year=2017, term='fall')
        self.ad = Lecture.objects.create(id=2, title="Architectural Design",
                                         date=dato, start_time=tid, end_time=tid, course=self.pu)

    def test_url_lectures(self):
        """URL input gives right HTTP response for '/courses/<int>/lectures/'"""

        url = reverse('course_lecture_list', args=[100])
        self.assertEqual(url, '/courses/100/lectures/')

        response = self.client.get('/courses/1/lectures/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        response = self.client.get('/courses/1/lectures/')
        self.assertEqual(response.status_code, 403) # because not enrolled in class

        CourseMembership.objects.create(course=self.pu, user=self.user, role="STUDENT")
        response = self.client.get('/courses/1/lectures/')
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        self.client.logout()
        self.user.delete()



class UrlCourseDeitalTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_superuser(username='user', email='laid@is.best',
                                                  password="qwertyuiop")
        self.pu = Course.objects.create(id=1, code="TDT4140", name="Programvareutvikling",
                                        year=2017, term='fall')

    def test_url_coursedetail(self):
        """URL input gives right HTTP response for '/courses/<int>'"""
        url = reverse('course_detail', args=[1])
        self.assertEqual(url, '/courses/1/')

        response = self.client.post('/courses/100/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        response = self.client.get('/courses/9090909091292/')
        self.assertEqual(response.status_code, 404)

        response = self.client.get('/courses/1/')
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        self.client.logout()
        self.user.delete()


#
#
# api test: http://www.django-rest-framework.org/api-guide/testing/