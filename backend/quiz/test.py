import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
import django
django.setup()

from django.contrib.auth.models import User
from quiz.models import Quiz, Question, Option, QuestionAnswer
from django.utils.timezone import now


quiz = Quiz(title="Quiz 1", description="desc", start_time=now(), end_time=now())
quiz.save()
question = Question(quiz=quiz, question="Is this a question?", answer_description="Obviously")
question.save()
yes = Option(question=question, text="Yes", correct=True)
yes.save()
no = Option(question=question, text="No", correct=False)
no.save()

user = User.objects.get(username="admin")

answer = QuestionAnswer(question=question, user=user, choice=yes)
answer.save()

print(answer.choice.question.quiz)
for question in quiz.questions.all():
    print(question)
    for answer in question.answers.all():
        print(answer.user, answer.choice, answer.choice.correct)