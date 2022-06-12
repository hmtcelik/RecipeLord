from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Recipe(models.Model):
    owner = models.ForeignKey(User, related_name="recipes", on_delete=models.CASCADE, default=0)
    title = models.CharField(max_length=120)
    cover = models.ImageField(blank=True, null=True, upload_to ='uploads/') 
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    
class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    
    def __str__(self):
        return self.recipe.title + ' - ' + self.title
    
