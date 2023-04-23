"""django_test URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
# from .views import processInput
from .views import processInput, getcontent, getrequire, fetchdata, loadcontent, getfunctiongraph,fetchversion


urlpatterns = [
        path('processInput', processInput, name='processInput'),
    path('getcontent',getcontent,name='getcontent'),
    path('getrequire',getrequire,name='getrequire'),
    path('fetchdata',fetchdata,name='fetchdata'),
    path('loadcontent',loadcontent,name='loadcontent'),
    path('getfunctiongraph',getfunctiongraph,name='getfunctiongraph'),
    path('fetchversion',fetchversion,name='fetchversion'),
]

