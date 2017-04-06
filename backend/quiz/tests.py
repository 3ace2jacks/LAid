from django.test import TestCase
from quiz.models import Quiz, Question, Option, QuestionAnswer
from course.models import Course, Lecture, CourseMembership
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from datetime import date, time
import json


'''To get the sets coverage for course run:
coverage run --source='.' --include='quiz/*' --omit='*/__init__.py,*/admin.py,*/apps.py,
*/migrations/*,*/tests.py' manage.py test quiz
then:
coverage report --include='quiz/*' --omit='*/__init__.py,*/admin.py,*/apps.py,*/migrations/*,
*/tests.py'
'''

class ModelTestCase(TestCase):
    '''
    Test the models
    '''
    def setUp(self):
        self.user = User.objects.create_superuser(username='user',
                                                  email='laid@is.best', password="qwertyuiop")
        self.pu = Course.objects.create(id=1, code="TDT4140", name="Programvareutvikling",
                              year=2017, term="fall")
        dato = date(2017, 5, 5)
        tid = time()
        self.ad = Lecture.objects.create(id=1, title="Architectural Design",
                                         date=dato, start_time=tid, end_time=tid, course=self.pu)
        self.q = Quiz.objects.create(title='Quiz 1', )

    def test_lecture_flow(self):
        """LectureFlow, create and correct output __str__"""
        l_flow = LectureFlow.objects.create(user=self.user, lecture=self.ad, flow='slow')
        self.assertEqual(l_flow.__str__(), '1 - slow')

    def test_lecture_question(self):
        """LectureQuestion create and correct output __str__"""
        l_question = LectureQuestion.objects.create(user=self.user, lecture=self.ad,
                                               question='question')
        self.assertEqual(l_question.__str__(), 'question')

    def test_lecture_vote(self):
        """LectureQuestion create and correct output __str__"""
        l_question = LectureQuestion.objects.create(user=self.user, lecture=self.ad,
                                                    question='question')
        l_vote = Vote.objects.create(user=self.user, vote='up',
                                     question=l_question)
        self.assertEqual(Vote.objects.count(), 1)

class ViewTestCase(TestCase):
    '''
    Test the views and permissions
    '''

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_superuser(username='user',
                                                  email='laid@is.best', password="qwertyuiop")
        self.not_member = User.objects.create_superuser(username='user1',
                                                  email='laid@is.best', password="qwertyuiop")
        self.instructor = User.objects.create_superuser(username='user2',
                                                        email='laid@is.best',
                                                        password="qwertyuiop")
        self.pu = Course.objects.create(id=1, code="TDT4140", name="Programvareutvikling",
                                        year=2017, term="fall")
        dato = date(2017, 5, 5)
        tid = time()
        self.ad = Lecture.objects.create(id=1, title="Architectural Design",
                                         date=dato, start_time=tid, end_time=tid,
                                         course=self.pu)

        CourseMembership.objects.create(course=self.pu, user=self.user, role="STUDENT")
        LectureFlow.objects.create(user=self.user, lecture=self.ad, flow='slow')
        LectureQuestion.objects.create(id=1, user=self.user, lecture=self.ad,
                                       question='question')
        CourseMembership.objects.create(course=self.pu, user=self.instructor, role="INSTRUCTOR")

    def test_urls(self):
        '''Tests right url is consistent for frontend'''
        url = reverse('flowlist', args=[1])
        self.assertEqual(url, '/lectures/1/flow/')

        url = reverse('questionlist', args=[1])
        self.assertEqual(url, '/lectures/1/questions/')

        url = reverse('flowCount', args=[1,1])
        self.assertEqual(url, '/lectures/1/flow/count/1')

        url = reverse('lecture_detail', args=[1])
        self.assertEqual(url, '/lectures/1/')

        url = reverse('live_question_answer', args=[1])
        self.assertEqual(url, '/questions/1/answer/')

        url = reverse('vote', args=[1])
        self.assertEqual(url, '/questions/1/votes/')


    def test_flow_list(self):
        """Test security for FlowList"""

        response = self.client.get('/lectures/1/flow/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        response = self.client.get('/lectures/1/flow/')
        self.assertEqual(response.status_code, 200)

        self.client.login(username='user1', password='qwertyuiop')
        response = self.client.get('/lectures/1/flow/')
        self.assertEqual(response.status_code, 403)

    def test_flow_count(self):
        """Test security for FlowCount"""

        response = self.client.get('/lectures/1/flow/count/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        response = self.client.get('/lectures/1/flow/count/')
        self.assertEqual(response.status_code, 200)

        self.client.login(username='user1', password='qwertyuiop')
        response = self.client.get('/lectures/1/flow/count/')
        self.assertEqual(response.status_code, 403)

    def test_question_list(self):
        """Test security for QuestionList"""

        response = self.client.get('/lectures/1/questions/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        response = self.client.get('/lectures/1/questions/')
        self.assertEqual(response.status_code, 200)

        self.client.login(username='user1', password='qwertyuiop')
        response = self.client.get('/lectures/1/questions/')
        self.assertEqual(response.status_code, 403)

    def test_vote(self):
        """Test security for VoteList"""

        response = self.client.get('/questions/1/votes/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        up_vote = {
            "vote": "up",
        }
        response = self.client.post('/questions/1/votes/', json.dumps(up_vote),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)

        self.client.login(username='user1', password='qwertyuiop')
        response = self.client.get('/questions/1/votes/')
        self.assertEqual(response.status_code, 403)

    def test_question(self):
        """Test security for AnswearliveQuestion"""

        response = self.client.get('/questions/1/answer/')
        self.assertEqual(response.status_code, 403)

        answered = {
            "answered": True,
        }

        self.client.login(username='user2', password='qwertyuiop')
        response = self.client.post('/questions/1/answer/', json.dumps(answered),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

        self.client.login(username='user1', password='qwertyuiop')
        response = self.client.get('/questions/1/answer/')
        self.assertEqual(response.status_code, 403)


    def tearDown(self):
        self.client.logout()