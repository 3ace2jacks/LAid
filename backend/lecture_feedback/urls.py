from django.conf.urls import url
from lecture_feedback import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/flow/$', views.FlowList.as_view(), name='flowlist'),
]

urlpatterns = format_suffix_patterns(urlpatterns)