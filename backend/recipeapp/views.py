from django.shortcuts import render
from rest_framework import viewsets

from .serializers import RecipeSerializer, RecipeIngredientSerializer, UserSerializer
from .models import Recipe, RecipeIngredient
from django.contrib.auth.models import User


class RecipeView(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class RecipeIngredientView(viewsets.ModelViewSet):
    serializer_class = RecipeIngredientSerializer
    queryset = RecipeIngredient.objects.all()
    
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
