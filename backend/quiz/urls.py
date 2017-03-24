from django.conf.urls import url
from quiz import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.QuizList.as_view(), name='quizzes'),
    url(r'^(?P<pk>[0-9]+)/$', views.QuizStudentDetail.as_view(), name='quizDetail'),
    url(r'^(?P<pk>[0-9]+)/$', views.QuizStudentDetail.as_view(), name='quizDetail'),
    url(r'^(?P<pk>[0-9]+)/answers/$', views.AnswerQuiz.as_view(), name='quizAnswer'),
]

urlpatterns = format_suffix_patterns(urlpatterns)