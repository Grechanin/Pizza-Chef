from django.contrib import admin
from .models import *


class StatusAdmin(admin.ModelAdmin):
    list_display = [ field.name for field in Status._meta.fields]

    class Meta:
        model = Status


admin.site.register(Status, StatusAdmin)


class IngredientInOrderInline(admin.TabularInline):
    model = PizzaIngredientInOrder
    extra = 0


class OrderAdmin(admin.ModelAdmin):
    list_display = [ field.name for field in Order._meta.fields]
    inlines = [IngredientInOrderInline]
    list_filter = ['status']


    class Meta:
        model = Order


admin.site.register(Order, OrderAdmin)


class PizzaIngredientInOrderAdmin(admin.ModelAdmin):
    list_display = [field.name for field in PizzaIngredientInOrder._meta.fields]

    class Meta:
        model = PizzaIngredientInOrder


admin.site.register(PizzaIngredientInOrder, PizzaIngredientInOrderAdmin)


class IngredientsInBasketAdmin(admin.ModelAdmin):
    list_display = [field.name for field in IngredientsInBasket._meta.fields]

    class Meta:
        model = IngredientsInBasket


admin.site.register(IngredientsInBasket, IngredientsInBasketAdmin)