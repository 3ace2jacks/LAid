from django.conf.urls import url
from course import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.CourseList.as_view(), name='course'),
    url(r'^(?P<pk>[0-9]+)/$', views.CourseDetail.as_view(), name='courseDetail'),
    url(r'^(?P<pk>[0-9]+)/join/$', views.JoinCourse.as_view(), name='courseJoin'),
    url(r'^(?P<pk>[0-9]+)/lectures/$', views.LectureList.as_view(), name='lectureList'),
]

urlpatterns = format_suffix_patterns(urlpatterns)