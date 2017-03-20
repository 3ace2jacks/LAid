from django.conf.urls import url
from lecture_feedback import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/flow/$', views.FlowList.as_view(), name='flowlist'),
    url(r'^(?P<pk>[0-9]+)/question/all/$', views.QuestionList.as_view(), name='questionlist'),
    url(r'^(?P<pk>[0-9]+)/question/(?P<lk>[0-9]+)/$', views.VoteList.as_view(),
        name='voteList'),
    url(r'^(?P<pk>[0-9]+)/flow/count/(?P<tk>[0-9]+)$', views.FlowCount.as_view(),
        name='flowCount'),
    url(r'^(?P<pk>[0-9]+)/flow/count/$', views.FlowCount.as_view(),
        name='flowCountDefault'),
]

urlpatterns = format_suffix_patterns(urlpatterns)