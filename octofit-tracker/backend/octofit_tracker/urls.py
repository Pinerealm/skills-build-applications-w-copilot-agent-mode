"""octofit_tracker URL Configuration

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


import os
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from .api import api_urlpatterns

# API root endpoint that returns the correct API base URL using $CODESPACE_NAME
def api_base_url(request):
    codespace_name = os.environ.get('CODESPACE_NAME', None)
    if codespace_name:
        api_url = f"https://{codespace_name}-8000.app.github.dev/api/"
    else:
        # fallback to localhost for local development
        api_url = "http://localhost:8000/api/"
    return JsonResponse({"api_base_url": api_url})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/base-url/', api_base_url, name='api-base-url'),
] + api_urlpatterns
