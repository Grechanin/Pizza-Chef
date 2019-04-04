from django.conf.urls import url
from .views import PizzaIngredientsListAPI, IngredientsCategoriesListAPI

urlpatterns = [
    url(r'^ingredients/$', PizzaIngredientsListAPI.as_view(), name='ingredients'),
    url(r'^categories/$', IngredientsCategoriesListAPI.as_view(), name='categories'),
]
