from django.conf.urls import url
from quiz import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.QuizList.as_view(), name='quizzes'),
    url(r'^(?P<pk>[0-9]+)/$', views.QuizStudentDetail.as_view(), name='quizDetail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)