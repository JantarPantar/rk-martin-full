from django.urls import path
from .views import list_properties, property_detail

from . import views

urlpatterns = [
    path("", views.index, name="index"),

    path("property/list", list_properties, name="list_properties"),
    path("property/<int:pk>", property_detail, name="property"),
]