from django.conf.urls import url
from .views import (
						IngredientsInBasketListCreateAPI,
						IngredientInBasketUpdateAPI,
						IngredientInBasketRetrieveDestroyAPI,
						OrderCreateAPI,
						PizzaIngredientInOrderCreateAPI,
                        activate
					)

urlpatterns = [
    url(r'^add_ingredient/$', IngredientsInBasketListCreateAPI.as_view(), name='add-ingredient'),
    url(r'^basket_update/(?P<id>\d+)/$', IngredientInBasketUpdateAPI.as_view(), name='basket-update'),
    url(r'^ingredient_destroy/(?P<id>\d+)/$', IngredientInBasketRetrieveDestroyAPI.as_view(), name='ingredient-destroy'),
    url(r'^order_create/$', OrderCreateAPI.as_view(), name='order-create'),
    url(r'^ingredients_in_order_create/$', PizzaIngredientInOrderCreateAPI.as_view(), name='ingredients_in_order_create'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', activate, name='activate'),
]
