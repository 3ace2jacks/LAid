from django.conf.urls import url
from accounts import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^register/$', views.UserRegister.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)