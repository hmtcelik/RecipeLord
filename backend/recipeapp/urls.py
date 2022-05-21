from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('recipes', views.RecipeView, 'recipe')
router.register('recipeingredients', views.RecipeIngredientView, 'recipeingredient')
router.register('register', views.UserView, 'register')

urlpatterns = [
  path('login/', views.LoginView.as_view(), name='login'),
]

urlpatterns += router.urls