"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from course.views import UserCourseList, CourseDetail, AvailableCourseList, JoinCourse, CourseLectureList, LectureDetail
from quiz.views import QuizCreate, QuizDetail, AnswerQuestion, QuizResult
from live.views import FlowList, FlowCount, QuestionList, VoteList, AnswerLiveQuestion
from quiz.views import answerQuestion


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^auth/', include('djoser.urls.authtoken')),

    url(r'^courses/(?P<pk>[0-9]+)/lectures/$', CourseLectureList.as_view(), name="course_lecture_list"),
    url(r'^courses/(?P<pk>[0-9]+)/join/$', JoinCourse.as_view(), name="join_course"),
    url(r'^courses/(?P<pk>[0-9]+)/$', CourseDetail.as_view(), name="course_detail"),
    url(r'^courses/available/$', AvailableCourseList.as_view(), name="available_course_list"),
    url(r'^courses/member/$', UserCourseList.as_view(), name="member_course_list"),

    url(r'^quiz/(?P<pk>[0-9]+)/result$', QuizResult.as_view(), name="quiz_result"),
    url(r'^quiz/(?P<pk>[0-9]+)/answer/$', AnswerQuestion.as_view(), name="answer_question_quiz"),
    url(r'^quiz/(?P<pk>[0-9]+)/$', QuizDetail.as_view(), name="quiz_detail"),
    url(r'^quiz/$', QuizCreate.as_view(), name="quiz_create"),

    url(r'^lectures/(?P<pk>[0-9]+)/questions/$', QuestionList.as_view(), name='questionlist'),
    url(r'^lectures/(?P<pk>[0-9]+)/flow/count/(?P<tk>[0-9]+)$', FlowCount.as_view(),
        name='flowCount'),
    url(r'^lectures/(?P<pk>[0-9]+)/flow/count/$', FlowCount.as_view(),
        name='flowCountDefault'),
    url(r'^lectures/(?P<pk>[0-9]+)/flow/$', FlowList.as_view(), name='flowlist'),
    url(r'^lectures/(?P<pk>[0-9]+)/$', LectureDetail.as_view(), name="lecture_detail"),

    url(r'^questions/(?P<pk>[0-9]+)/answer/$', AnswerLiveQuestion.as_view(), name='live_question_answer'),
    url(r'^questions/(?P<pk>[0-9]+)/votes/$', VoteList.as_view(), name='vote'),
]
