from menu.models import PizzaIngredient, IngredientsCategory
from rest_framework import serializers


class PizzaIngredientsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PizzaIngredient
        fields = (
            'id',
            'name',
            'category',
            'price',  
        )

class IngredientsCategoriesLisSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientsCategory
        fields = (
            'id',
            'name', 
            'is_dough', 
        )