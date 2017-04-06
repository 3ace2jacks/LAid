from django.http import HttpResponse

from quiz.models import Quiz, QuestionAnswer, Question, Option
from rest_framework import generics
from quiz.serializers import QuizSerializer, QuestionAnswerSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import quiz.permissions as p


class QuizCreate(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, p.IsInstructor)
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuizDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated, p.IsMember)

    """Return the course information of the course with the id in the url."""
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuizResult(APIView):
    permission_classes = (IsAuthenticated, p.IsMember)
    def get(self, request, pk, format=None):
        quiz = Quiz.objects.get(id=pk)
        result = {
            'quizID': quiz.id,
            'title': quiz.title,
            'questionsResults': []
        }
        for question in Question.objects.filter(quiz=quiz):
            que = {
                'questionID': question.id,
                'question': question.question,
                'optionResults': []
            }
            for option in Option.objects.filter(question=question):
                opt = {
                    'optionID': option.id,
                    'text': option.text,
                    'correct': option.correct,
                    'answers': QuestionAnswer.objects.filter(choice=option).count()
                }
                que['optionResults'].append(opt)
            result['questionsResults'].append(que)
        return Response(result)


class AnswerQuestion(generics.ListAPIView):
    permission_classes = (IsAuthenticated, p.IsStudentInLecture)

    def post(self, request, *args, **kwargs):
        quiz = Quiz.objects.get(id=self.kwargs['pk'])
        answers = request.data['answers']
        for ans in answers:
            if QuestionAnswer.objects.filter(question=Question.objects.get(id=ans['question']),
                                          user=request.user):
                return HttpResponse('Success', status=400)
            if not Question.objects.get(id=ans['question']).quiz == quiz:
                return HttpResponse('Success', status=400)
            if not Option.objects.get(id=ans['choice']).question == Question.objects.get(id=ans[
                'question']):
                return HttpResponse('Success', status=400)
            a = QuestionAnswer.objects.create(question=Question.objects.get(id=ans['question']),
                                          choice=Option.objects.get(id=ans['choice']),
                                          user=request.user)
            a.save()

        return HttpResponse('Success', status=201)
    queryset = QuestionAnswer.objects.all()
    serializer_class = QuestionAnswerSerializer
