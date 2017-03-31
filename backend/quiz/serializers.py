from rest_framework import serializers
from quiz.models import Quiz, Question, Option, QuestionAnswer
from course.models import Lecture
from datetime import datetime

class OptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Option
        fields = ['id', 'text', 'correct']


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)
    class Meta:
        model = Question
        fields = ['id', 'question', 'answer_description', 'options']


class QuizSerializer(serializers.ModelSerializer):
    finished = serializers.SerializerMethodField(read_only=True)
    answered = serializers.SerializerMethodField(read_only=True)

    questions = QuestionSerializer(many=True)
    lectureID = serializers.IntegerField(write_only=True)
    lectureQuiz = serializers.ChoiceField(choices=(('pre_quiz', 'pre_quiz'), ('post_quiz', 'post_quiz')), write_only=True)

    def get_finished(self, obj):
        return False

    def get_answered(self, obj):
        return False

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'deadline', 'questions', 'lectureID', 'lectureQuiz', 'finished', 'answered']


    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        lecture = Lecture.objects.get(id=validated_data.pop('lectureID'))
        lectureQuiz = validated_data.pop('lectureQuiz')
        quiz = Quiz.objects.create(**validated_data)

        for question_data in questions_data:
            options_data = question_data.pop('options')
            question = Question.objects.create(quiz=quiz, **question_data)
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)

        if lectureQuiz=='post_quiz':
            lecture.post_quiz = quiz
        else:
            lecture.pre_quiz = quiz
        lecture.save()

        return quiz



class QuestionAnswerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = QuestionAnswer
        fields = ['question', 'choice', 'user']
