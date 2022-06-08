from django.urls import path, include
from rest_framework import routers
from . import views as my_views

#django knox
from knox import views as knox_views

#router
router = routers.DefaultRouter()
router.register('recipes', my_views.RecipeView, 'recipe')
router.register('recipeingredients', my_views.RecipeIngredientView, 'recipeingredient')

#urls
urlpatterns = [
  path('register/', my_views.RegisterAPI.as_view(), name='register'),
  path('login/', my_views.LoginAPI.as_view(), name='login'),
  path('logout/', knox_views.LogoutView.as_view(), name='logout'),
  
  path('user/', my_views.UserAPI.as_view(), name='user'),
  path('search_recipe/', my_views.SearchRecipeView.as_view(), name='search_recipe')
]

urlpatterns += router.urls