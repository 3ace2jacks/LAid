from django.test import TestCase, Client
from django.utils.timezone import now
from course.models import Course, Lecture, CourseMembership
from django.urls import reverse
from django.contrib.auth.models import User


class CourseTestCase(TestCase):
    def setUp(self):
        Course.objects.create(code="TDT4140", name="Programvareutvikling",
                              year=2017)
        Course.objects.create(code="TMA4100", name="Matte 1", year=2017)

    def test_course_str(self):
        """Courses correct output __str__"""
        pu = Course.objects.get(code="TDT4140")
        matte1 = Course.objects.get(code="TMA4100")
        self.assertEqual(pu.__str__(), 'TDT4140 - Programvareutvikling')
        self.assertEqual(matte1.__str__(), 'TMA4100 - Matte 1')


class LectureTestCase(TestCase):
    def setUp(self):
        date = now()
        Course.objects.create(code="TDT4140", name="Programvareutvikling",
                              year=2017)
        course_id = Course.objects.get(code="TDT4140")
        Lecture.objects.create(title="Architectural Design",
                               start_time=date,
                               end_time=date, course=course_id)
        Lecture.objects.create(title="Taylor", start_time=date,
                               end_time=date, course=course_id)

    def test_course_str(self):
        """Lecture correct output __str__"""
        ad = Lecture.objects.get(title="Architectural Design")
        t = Lecture.objects.get(title="Taylor")
        self.assertEqual(ad.__str__(), 'Architectural Design')
        self.assertEqual(t.__str__(), 'Taylor')


class UrlCoursesTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create(username='user', password="user")

    def test_url_courses(self):
        """URL input gives right HTTP response for '/courses/'"""

        url = reverse('course')
        self.assertEqual(url, '/courses/')

        response = self.client.post('/courses/')
        self.assertEqual(response.status_code, 403)

        response = self.client.post('/api-auth/login/', {'username': 'user1', 'password': 'user'})
        self.client.get('/courses/')
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        self.user.delete()
        self.client.logout()


class UrlLectureListCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create(username='user', password="user")

    def test_url_lectures(self):
        """URL input gives right HTTP response for '/courses/<int>/lectures/'"""

        url = reverse('lectureList', args=[100])
        self.assertEqual(url, '/courses/100/lectures/')

        response = self.client.get('/courses/100/lectures/')
        self.assertEqual(response.status_code, 200)

        response = self.client.post('/api-auth/login/', {'username': 'user1', 'password': 'user'})
        self.client.get('/courses/100/lectures/')
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        self.user.delete()
        self.client.logout()


class UrlCourseDeitalTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create(username='user', password="user")

    def test_url_coursedetail(self):
        """URL input gives right HTTP response for '/courses/<int>'"""
        url = reverse('courseDetail', args=[100])
        self.assertEqual(url, '/courses/100/')

        response = self.client.post('/courses/100/')
        self.assertEqual(response.status_code, 403)

        response = self.client.post('/api-auth/login/', {'username': 'user1', 'password': 'user'})
        self.client.get('/courses/100/')
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        self.user.delete()
        self.client.logout()


# api test: http://www.django-rest-framework.org/api-guide/testing/
