from dataclasses import fields
from rest_framework import serializers
from .models import Recipe, RecipeIngredient
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"

class RecipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User(
        email=validated_data['email'],
        username=validated_data['username']
    )
    user.set_password(make_password(validated_data['password']))
    user.save()
    return user
