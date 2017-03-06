from django.conf.urls import url
from course import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.MemberCourseList.as_view(), name='course'),
    url(r'^all/$', views.CourseList.as_view(), name='coursesAll'),
    url(r'^(?P<pk>[0-9]+)/$', views.CourseDetail.as_view(), name='courseDetail'),

    url(r'^(?P<pk>[0-9]+)/join/$', views.JoinCourse.as_view(), name='courseJoin'),
    url(r'^(?P<pk>[0-9]+)/lectures/$', views.LectureList.as_view(), name='lectureList'),

    url(r'^(?P<pk>[0-9]+)/lectures/(?P<lk>[0-9]+)/pre_quiz/$', views.PreQuiz.as_view(),
        name='lecture-pre_quiz'),
    url(r'^(?P<pk>[0-9]+)/lectures/(?P<lk>[0-9]+)/pre_quiz/answers/$',
        views.AnswerPreList.as_view(),
        name='lecture-pre_quiz-answers'),
    url(r'^(?P<pk>[0-9]+)/lectures/(?P<lk>[0-9]+)/post_quiz/$', views.PostQuiz.as_view(),
        name='lecture-post_quiz'),
    url(r'^(?P<pk>[0-9]+)/lectures/(?P<lk>[0-9]+)/post_quiz/answers/$',
        views.AnswerPostList.as_view(),
        name='lecture-post_quiz-answers'),

    url(r'^(?P<pk>[0-9]+)/students/$', views.CourseUserList.as_view(), name='courseUserList'),
]

urlpatterns = format_suffix_patterns(urlpatterns)