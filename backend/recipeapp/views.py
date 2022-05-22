#rest framework materials
from rest_framework import viewsets, views, permissions, status, generics
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer

#knox materials
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView

#my models and seralizers
from . import serializers as mySerializers
from .models import Recipe, RecipeIngredient
from django.contrib.auth.models import User

#useful functions
from django.contrib.auth import login
    
class RecipeView(viewsets.ModelViewSet):
    serializer_class = mySerializers.RecipeSerializer
    queryset = Recipe.objects.all()


class RecipeIngredientView(viewsets.ModelViewSet):
    serializer_class = mySerializers.RecipeIngredientSerializer
    queryset = RecipeIngredient.objects.all()

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = mySerializers.RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": mySerializers.UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })
        
class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)