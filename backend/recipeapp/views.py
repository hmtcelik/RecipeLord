from django.shortcuts import render
from rest_framework import viewsets, views, permissions, status
from rest_framework.response import Response


from . import serializers as mySerializers
from .models import Recipe, RecipeIngredient
from django.contrib.auth.models import User

from django.contrib.auth import login


class RecipeView(viewsets.ModelViewSet):
    serializer_class = mySerializers.RecipeSerializer
    queryset = Recipe.objects.all()


class RecipeIngredientView(viewsets.ModelViewSet):
    serializer_class = mySerializers.RecipeIngredientSerializer
    queryset = RecipeIngredient.objects.all()
    
class UserView(viewsets.ModelViewSet):
    serializer_class = mySerializers.UserSerializer
    queryset = User.objects.all()
    
class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        permissions.AllowAny,
        ]


    def post(self, request, format=None):
        serializer = mySerializers.LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)
