from django.contrib import admin
from .models import *


class IngredientsCategoryAdmin(admin.ModelAdmin):
    list_display = [ field.name for field in IngredientsCategory._meta.fields]

    class Meta:
        model = IngredientsCategory


admin.site.register(IngredientsCategory, IngredientsCategoryAdmin)


class PizzaIngredientAdmin(admin.ModelAdmin):
    list_display = [ field.name for field in PizzaIngredient._meta.fields]

    class Meta:
        model = PizzaIngredient


admin.site.register(PizzaIngredient, PizzaIngredientAdmin)