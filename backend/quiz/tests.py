from django.test import TestCase
from quiz.models import Quiz, Question, Option, QuestionAnswer
from course.models import Course, Lecture, CourseMembership
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from datetime import date, time, datetime
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
        self.user2 = User.objects.create_superuser(username='user2',
                                                  email='laid@is.best', password="qwertyuiop")
        self.pu = Course.objects.create(id=1, code="TDT4140", name="Programvareutvikling",
                              year=2017, term="fall")
        dato = date(2017, 5, 5)
        tid = time()

        self.q = Quiz.objects.create(title='Quiz 1', description='desc', deadline=datetime.now())
        self.q2 = Quiz.objects.create(title='Quiz 1', description='desc', deadline=datetime.now())
        self.qu = Question.objects.create(quiz=self.q, question='question', answer_description='')
        self.op = Option.objects.create(question=self.qu, text='option', correct=True)

        self.ad = Lecture.objects.create(id=1, title="Architectural Design",
                                         date=dato, start_time=tid, end_time=tid,
                                         course=self.pu, pre_quiz=self.q)
        self.rel1 = CourseMembership.objects.create(course=self.pu, user=self.user,
                                                   role='INSTRUCTOR')
        self.rel2 = CourseMembership.objects.create(course=self.pu, user=self.user2,
                                                   role='STUDENT')


    def test_quiz(self):
        """LectureFlow, create and correct output __str__"""
        self.assertEqual(self.q.__str__(), 'Quiz 1')

        self.assertEqual(self.q.get_role(self.user), 'INSTRUCTOR')
        self.assertEqual(self.q.get_role(self.user2), 'STUDENT')

    def test_question(self):
        """LectureQuestion create and correct output __str__"""
        self.assertEqual(self.qu.__str__(), 'question')

    def test_option(self):
        """LectureQuestion create and correct output __str__"""
        self.assertEqual(self.op.__str__(), 'option')

    def test_question_answer(self):
        """sakldfjsa"""
        self.assertEqual(QuestionAnswer.objects.count(), 0)
        a = QuestionAnswer.objects.create(question=self.qu, choice=self.op, user=self.user)
        self.assertEqual(QuestionAnswer.objects.count(), 1)
        self.assertEqual(Question.objects.get(id=1).answers.get(id=1), a)

class ViewTestCase(TestCase):
    '''
    Test the views and permissions
    '''

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_superuser(username='user',
                                                  email='laid@is.best', password="qwertyuiop")
        self.user2 = User.objects.create_superuser(username='user2',
                                                   email='laid@is.best', password="qwertyuiop")
        self.pu = Course.objects.create(id=1, code="TDT4140", name="Programvareutvikling",
                                        year=2017, term="fall")
        dato = date(2017, 5, 5)
        tid = time()

        self.q = Quiz.objects.create(title='Quiz 1', description='desc', deadline=datetime.now())
        self.q2 = Quiz.objects.create(title='Quiz 1', description='desc', deadline=datetime.now())
        self.qu = Question.objects.create(quiz=self.q, question='question', answer_description='')
        self.op = Option.objects.create(question=self.qu, text='option', correct=True)

        self.ad = Lecture.objects.create(id=1, title="Architectural Design",
                                         date=dato, start_time=tid, end_time=tid,
                                         course=self.pu, pre_quiz=self.q)
        self.rel1 = CourseMembership.objects.create(course=self.pu, user=self.user,
                                                    role='INSTRUCTOR')
        self.rel2 = CourseMembership.objects.create(course=self.pu, user=self.user2,
                                                    role='STUDENT')

    def test_urls(self):
        '''Tests right url is consistent for frontend'''
        url = reverse('quiz_create')
        self.assertEqual(url, '/quiz/')

        url = reverse('quiz_detail', args=[1])
        self.assertEqual(url, '/quiz/1/')

        url = reverse('answer_question_quiz', args=[1])
        self.assertEqual(url, '/quiz/1/answer/')

        url = reverse('quiz_result', args=[1])
        self.assertEqual(url, '/quiz/1/result/')


    def test_quiz_create(self):
        """Test security for QuizCreate"""

        response = self.client.get('/quiz/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user2', password='qwertyuiop')
        data = {
            'title': 'Quiz 1',
            'description' : 'desc',
            'deadline': '1990-03-13T00:00',
            'lectureID': 1,
            'lectureQuiz': 'post_quiz',
            'questions': [
                {
                    'question': "Is this the real life?",
                    'answer_description': "Description",
                    'options' : [
                        {
                            'text': "No one knows",
                            'correct': False,
                        },
                        {
                            'text': "Yes",
                            'correct': True,
                        },
                        {
                            'text': "No",
                            'correct': False,
                        },
                    ]
                },

                {
                    'question': "Is this just fantasy?",
                    'answer_description': "Description",
                    'options' : [
                        {
                            'text': "Yes",
                            'correct': False,
                        },
                        {
                            'text': "Caught in a landslide",
                            'correct': True,
                        },
                        {
                            'text': "No",
                            'correct': False,
                        },

                    ]
                },
            ]
        }
        response = self.client.post('/quiz/', json.dumps(data),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        response = self.client.post('/quiz/', json.dumps(data),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_quiz_detail(self):
        """Test security for QuizDetail"""

        response = self.client.get('/quiz/1/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        response = self.client.get('/quiz/1/')
        self.assertEqual(response.status_code, 200)

        self.client.login(username='user2', password='qwertyuiop')
        response = self.client.get('/quiz/1/')
        self.assertEqual(response.status_code, 200)

    def test_quiz_result(self):
        """Test security for QuizResult"""

        response = self.client.get('/quiz/1/result/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        response = self.client.get('/quiz/1/result/')
        self.assertEqual(response.status_code, 200)

        self.client.login(username='user2', password='qwertyuiop')
        response = self.client.get('/quiz/1/result/')
        self.assertEqual(response.status_code, 200)

    def test_answer_question(self):
        """Test security for AnswerQuestion"""
        data = {
            'quizID': 1,
            'answers': [
                {
                'choice': 1,
                'question': 1
            }
            ]
        }

        response = self.client.get('/quiz/1/answer/')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user', password='qwertyuiop')
        response = self.client.post('/quiz/1/answer/', json.dumps(data),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 403)

        self.client.login(username='user2', password='qwertyuiop')
        response = self.client.post('/quiz/1/answer/', json.dumps(data),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)


    def tearDown(self):
        self.client.logout()