from orders.models import (
                            IngredientsInBasket,            
                            Order,
                            PizzaIngredientInOrder         
                        )
from rest_framework import serializers


class IngredientsInBasketCreateSerializer(serializers.ModelSerializer):
    is_dough = serializers.SerializerMethodField()
    class Meta:
        model = IngredientsInBasket
        fields = (
            'id',
            'ingredient',
            'total_price',  
            'nmb',
            'is_dough',
        )

    def get_is_dough(self, obj):
        is_dough = obj.ingredient.category.is_dough
        return is_dough



class OrderCreateAPISerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'id',
            'name',
            # 'delivery_address',
            'email',
            'phone',
            'comments',
            # 'status',
        )



class PizzaIngredientInOrderCreateAPISerializer(serializers.ModelSerializer):
    class Meta:
        model = PizzaIngredientInOrder
        fields = (
            'id',
            'order'
        )
