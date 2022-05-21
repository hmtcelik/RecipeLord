from rest_framework import serializers
from .models import Recipe, RecipeIngredient
from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate



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
  
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField(max_length=150)
  password = serializers.CharField(
    write_only = True,
    max_length = 150,
    trim_whitespace=False,    
  )
  
  def validate(self, data):
    username = data.get('username')
    password = data.get('password')
    
    if username and password:
      user = authenticate(request=self.context.get('request'), username=username, password=password)
      if not user:
        raise serializers.ValidationError("username or password is uncorrect" + ' '+ username +' '+ password, code='authorization')
    else:
      raise serializers.ValidationError("please input username and password", code='authorization')

    data['user'] = user
    return data
      