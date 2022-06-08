#django
from django.http import JsonResponse

#rest framework materials
from rest_framework import viewsets, views, permissions, status, generics, serializers
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

class UserAPI(generics.GenericAPIView):
    serializer_class = mySerializers.UserSerializer 
    
    def post(self, request):
        try:
            id = request.data['id']
            user = User.objects.filter(id=id)
            if user:                
                return Response({
                    "username": str(user[0]), 
                })
            else:
                return Response({
                    "404": "There is no user with this id", 
                })
                
        except:
            return Response({
                "404":"Please input with 'id' paramater" 
            })
        
class SearchRecipeView(generics.GenericAPIView):
    serializer_class = mySerializers.RecipeSearchSerializer
    
    def post(self, request):
        item = request.data['title']
        search = Recipe.objects.filter(title__icontains = item).values()
        search = list(search)
        print(search)

        if search:
            return Response({
            "recipes": search
            })
        else:
            return Response({
            "404": "There is no recipe with this title", 
            })     
        
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

    def get_post_response_data(self, request, token, instance):
        UserSerializer = mySerializers.UserSerializer

        data = {
            'user': UserSerializer(user, context= self.get_context()).data,
            'expiry': self.format_expiry_datetime(instance.expiry),
            'token': token
        }
        
        return data    

    def post(self, request, format=None):
        global user
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)        
        return super(LoginAPI, self).post(request, format=None)
    
