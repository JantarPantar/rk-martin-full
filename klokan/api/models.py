# models.py
import uuid
import os
from django.db import models

from .enums import StateEnum, TypeEnum

def unique_image_path(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4().hex}.{ext}"
    return os.path.join("properties", new_filename)

class Property(models.Model):
    title = models.CharField(max_length=200)
    state = models.IntegerField(choices=StateEnum.choices(), default=StateEnum.Available)
    type = models.IntegerField(choices=TypeEnum.choices(), default=TypeEnum.Apartment)
    visibility_level = models.IntegerField()
    street = models.CharField(max_length=300)
    city = models.CharField(max_length=200)
    longtitude = models.FloatField()
    latitude = models.FloatField()
    size_m2 = models.IntegerField()
    energy_rating = models.CharField(max_length=1)
    price = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return self.title

    def get_property_type_label(self):
        return TypeEnum(self.type).name.title()

    def get_property_state_label(self):
        return StateEnum(self.state).name.title()

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=unique_image_path)

    def __str__(self):
        return self.image.name
