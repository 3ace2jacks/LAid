from quiz.models import Quiz, QuestionAnswer, Question, Option
from rest_framework import generics
from quiz.serializers import QuizSerializer, QuestionAnswerSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class QuizCreate(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuizDetail(generics.RetrieveAPIView):
    """Return the course information of the course with the id in the url."""
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class AnswerQuestion(generics.ListCreateAPIView):
    queryset = QuestionAnswer.objects.all()
    serializer_class = QuestionAnswerSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class QuizResult(APIView):

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

