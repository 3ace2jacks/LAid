from django.test import TestCase, Client
from django.utils.timezone import now
from course.models import Course, Lecture, CourseMembership
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, APIClient
import json
from course.views import UserCourseList



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
        """Create courses using REST api"""
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
        self.user


#
# class LectureTestCase(TestCase):
#     def setUp(self):
#         date = now()
#         Course.objects.create(id=1, code="TDT4140", name="Programvareutvikling",
#                               year=2017)
#         course_id = Course.objects.get(code="TDT4140")
#         print(course_id)
#         Lecture.objects.create(id=2, title="Architectural Design",
#                                start_time=date,
#                                end_time=date, course=course_id)
#         Lecture.objects.create(title="Taylor", start_time=date,
#                                end_time=date, course=course_id)
#
#     def test_course_str(self):
#         """Lecture correct output __str__"""
#         ad = Lecture.objects.get(title="Architectural Design")
#         t = Lecture.objects.get(title="Taylor")
#         self.assertEqual(ad.__str__(), 'Architectural Design')
#         self.assertEqual(t.__str__(), 'Taylor')
#
#
#
# class UrlCoursesTestCase(TestCase):
#     def setUp(self):
#         self.client = Client()
#         self.user = User.objects.create_superuser(username='user',
#                                                   email='laid@is.best', password="qwertyuiop")
#
#     def test_url_courses(self):
#         """URL input gives right HTTP response for '/courses/'"""
#
#         url = reverse('course')
#         self.assertEqual(url, '/courses/')
#
#         response = self.client.post('/courses/')
#         self.assertEqual(response.status_code, 403)
#
#         self.client.login(username='user', password='qwertyuiop')
#         response = self.client.get('/courses/')
#         self.assertEqual(response.status_code, 200)
#
#     def tearDown(self):
#         self.client.logout()
#         self.user.delete()
#
#
#
# class UrlLectureListCase(TestCase):
#     def setUp(self):
#         self.client = Client()
#         self.user = User.objects.create(username='user', email='laid@is.best',
#                                         password="qwertyuiop")
#
#     def test_url_lectures(self):
#         """URL input gives right HTTP response for '/courses/<int>/lectures/'"""
#
#         url = reverse('lectureList', args=[100])
#         self.assertEqual(url, '/courses/100/lectures/')
#
#         response = self.client.get('/courses/100/lectures/')
#         self.assertEqual(response.status_code, 403) # Should be 403?
#
#         self.client.login(username='user', password='qwertyuiop')
#         response = self.client.get('/courses/100/lectures/')
#         self.assertEqual(response.status_code, 200) # returns True, always..
#
#     def tearDown(self):
#         self.client.logout()
#         self.user.delete()
#
#
#
# class UrlCourseDeitalTest(TestCase):
#     def setUp(self):
#         self.client = Client()
#         self.user = User.objects.create_superuser(username='user', email='laid@is.best',
#         password="qwertyuiop")
#
#     def test_url_coursedetail(self):
#         """URL input gives right HTTP response for '/courses/<int>'"""
#         url = reverse('courseDetail', args=[100])
#         self.assertEqual(url, '/courses/100/')
#
#         response = self.client.post('/courses/100/')
#         self.assertEqual(response.status_code, 403)
#
#         self.client.login(username='user', password='qwertyuiop')
#         response = self.client.get('/courses/9090909091292/')
#         self.assertEqual(response.status_code, 404)
#
#     def tearDown(self):
#         self.client.logout()
#         self.user.delete()
#
#
#
# class UrlCoursesAllTest(TestCase):
#     def setUp(self):
#         self.client = Client()
#         self.user = User.objects.create_superuser(username='user', email='laid@is.best',
#                                                   password="qwertyuiop")
#
#     def test_url_coursesAll(self):
#         """URL input gives right HTTP response for '/courses/all/'"""
#         url = reverse('coursesAll')
#         self.assertEqual(url, '/courses/all/')
#
#         response = self.client.get('/courses/all/')
#         self.assertEqual(response.status_code, 403) # should be 403?
#
#         self.client.login(username='user', password='qwertyuiop')
#         response = self.client.get('/courses/all/')
#         self.assertEqual(response.status_code, 200)
#
#     def tearDown(self):
#         self.client.logout()
#         self.user.delete()
#
#
# api test: http://www.django-rest-framework.org/api-guide/testing/