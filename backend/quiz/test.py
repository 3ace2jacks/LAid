import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
import django
django.setup()

from course.models import Lecture, Course
from django.utils.timezone import now
from quiz.serializers import QuizSerializer

course = Course.objects.create(code="TDT4140", name="Sofwaw", year=2016, term='fall')
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
            'question': "What is this?",
            'answer_description': "Description",
            'options' : [
                {
                    'text': "Option text",
                    'correct': True,
                }
            ]
        }
    ]
}
serializer = QuizSerializer(data=data)
print(serializer.is_valid())
print(serializer.validated_data)
serializer.save()