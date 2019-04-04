from menu.models import PizzaIngredient, IngredientsCategory
from .serializers import PizzaIngredientsListSerializer, IngredientsCategoriesLisSerializer
from rest_framework import generics


class PizzaIngredientsListAPI(generics.ListAPIView):
    queryset = PizzaIngredient.objects.filter(is_active=True)
    serializer_class = PizzaIngredientsListSerializer


class IngredientsCategoriesListAPI(generics.ListAPIView):
    queryset = IngredientsCategory.objects.filter(is_active=True)
    serializer_class = IngredientsCategoriesLisSerializer