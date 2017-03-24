import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
import django
django.setup()

from course.models import Lecture, Course
from django.utils.timezone import now
from quiz.serializers import QuizSerializer

course = Course.objects.create(code="TDT4140", name="SoftwareEngineering", year=2017, term='fall')
course.save()

lecture = Lecture.objects.create(title="Lecture one", course=course, start_time=now(), end_time=now())
lecture.save()

data = {
    'title': 'Quiz 1',
    'description' : 'desc',
    'start_time': '1990-03-13T00:00',
    'end_time': '1990-03-14T00:00',
    'lectureID': lecture.id,
    'lectureQuiz': 'pre_quiz',
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
serializer = QuizSerializer(data=data)
print(serializer.is_valid())
print(serializer.validated_data)
serializer.save()