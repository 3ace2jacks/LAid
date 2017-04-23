from rest_framework import serializers
from quiz.models import Quiz, Question, Option, QuestionAnswer
from course.models import Lecture
from django.utils import timezone


class OptionSerializer(serializers.ModelSerializer):
    """
    Serialize Option
    """
    class Meta:
        model = Option
        fields = ['id', 'text', 'correct']


class QuestionSerializer(serializers.ModelSerializer):
    """
    Serialize Question with nested options
    """
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'question', 'answer_description', 'options']


class QuizSerializer(serializers.ModelSerializer):
    """
    Serialize Quiz, with some additional fields
    """
    finished = serializers.SerializerMethodField(read_only=True)
    answered = serializers.SerializerMethodField(read_only=True)

    questions = QuestionSerializer(many=True)
    lectureID = serializers.IntegerField(write_only=True)
    lectureQuiz = serializers.ChoiceField(choices=(('pre_quiz', 'pre_quiz'),
                                                   ('post_quiz', 'post_quiz')), write_only=True)

    def get_finished(self, obj):
        """
        Checks if the Quiz is finished

        Parameters
        ----------
        obj : Obj
            Always a Quiz

        Returns
        -------
        bool
            True if the deadline has passed
            False otherwise
        """
        return timezone.now() > obj.deadline

    def get_answered(self, obj):
        """
        Returns all the answers for the quiz

        Parameters
        ----------
        obj : Obj
            Always a Quiz

        Returns
        -------
        list
            with QuestionAnswer to the quiz
        """
        return QuestionAnswer.objects.filter(question=obj.questions.filter(),
                                             user=self.context['request'].user).exists()

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'deadline', 'questions', 'lectureID',
                  'lectureQuiz', 'finished', 'answered']


    def create(self, validated_data):
        """
        Creates a Quiz to the Lecture

        Parameters
        ----------
        obj : Obj
            Always a Quiz

        Returns
        -------
        Obj
            Quiz
        """
        # validation
        questions_data = validated_data.pop('questions')
        lecture = Lecture.objects.get(id=validated_data.pop('lectureID'))
        lectureQuiz = validated_data.pop('lectureQuiz')
        quiz = Quiz.objects.create(**validated_data)
        # creates the Quiz
        for question_data in questions_data:
            options_data = question_data.pop('options')
            question = Question.objects.create(quiz=quiz, **question_data)
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)
        # sets post or pre quiz
        if lectureQuiz=='post_quiz':
            lecture.post_quiz = quiz
        else:
            lecture.pre_quiz = quiz
        lecture.save()
        return quiz



class QuestionAnswerSerializer(serializers.ModelSerializer):
    """
    Serialize QuestionAnswer
    """
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = QuestionAnswer
        fields = ['question', 'choice', 'user']
