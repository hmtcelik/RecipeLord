from django.contrib import admin
from .models import Recipe, RecipeIngredient

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'created_at')



admin.site.register(Recipe, RecipeAdmin)
admin.site.register(RecipeIngredient)