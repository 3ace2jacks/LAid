from rest_framework import serializers
from quiz.models import Quiz, Question, Option, QuestionAnswer
from course.models import Lecture

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAnswer
        fields = ['question', 'choice', 'user']

class OptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Option
        fields = ['text', 'correct']


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)
    class Meta:
        model = Question
        fields = ['question', 'answer_description', 'options']


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    lectureID = serializers.IntegerField(write_only=True)
    lectureQuiz = serializers.ChoiceField(choices=(('pre_quiz', 'pre_quiz'), ('post_quiz', 'post_quiz')), write_only=True)


    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'start_time', 'end_time', 'questions', 'lectureID', 'lectureQuiz']


    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        lecture = Lecture.objects.get(id=validated_data.pop('lectureID'))
        lectureQuiz = validated_data.pop('lectureQuiz')
        quiz = Quiz.objects.create(**validated_data)

        for question_data in questions_data:
            print(question_data)
            options_data = question_data.pop('options')
            print(options_data)
            question = Question.objects.create(quiz=quiz, **question_data)
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)

        if lectureQuiz=='post_quiz':
            lecture.post_quiz = quiz
        else:
            lecture.pre_quiz = quiz
        lecture.save()

        return quiz










