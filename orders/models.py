from django.db import models
from django.db.models.signals import post_save, post_delete
from menu.models import PizzaIngredient
from phonenumber_field.modelfields import PhoneNumberField


class Status(models.Model):
    name = models.CharField(max_length=24, blank=True, null=True, default=None)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    update = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Orders status'
        verbose_name_plural = 'Orders statuses'


class Order(models.Model):
    name = models.CharField(max_length=128, blank=False, null=False, default=None)
    total_price = models.DecimalField(max_digits=10, decimal_places=0, default=0) #total price for all ingredients in order
    email = models.EmailField(max_length=64, blank=True, null=True)
    phone = PhoneNumberField("Phone number", max_length=64, blank=True, null=True, default=None)
    delivery_address = models.CharField("Delivery address", max_length=128, blank=True, null=True, default=None)
    comments = models.TextField(blank=True, null=True, default=None)
    status = models.ForeignKey(Status, on_delete=models.CASCADE, default=1)
    is_active = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    update = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return "%s, %s" % (self.status.name, self.name)

    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'


class PizzaIngredientInOrder(models.Model):
    order = models.ForeignKey(Order, blank=True, null=True, default=None, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(PizzaIngredient, blank=True, null=True, default=None, on_delete=models.CASCADE)
    nmb = models.IntegerField("Quantity", default=1)
    price_pre_item = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0) #price*nmb
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    update = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return "Pizza ingredient name %s" % self.ingredient.name

    class Meta:
        verbose_name = 'Ingredient in order'
        verbose_name_plural = 'Ingredients in orders'

    def save(self, *args, **kwargs):
        price_pre_item = self.ingredient.price
        self.price_pre_item = price_pre_item
        self.total_price = int(self.nmb) * price_pre_item
        super(PizzaIngredientInOrder, self).save(*args, **kwargs)

def post_save_ingredients_in_order(sender, instance, created, *args, **kwargs):
    all_ingredients_in_order = PizzaIngredientInOrder.objects.filter(order=instance.order, is_active=True)
    order_total_price = 0
    for ingredient in all_ingredients_in_order:
        order_total_price += ingredient.total_price

    instance.order.total_price = order_total_price
    instance.order.save(force_update=True)

post_save.connect(post_save_ingredients_in_order, sender=PizzaIngredientInOrder)

def post_delete_ingredients_in_order(sender, instance, *args, **kwargs):
    all_ingredients_in_order = PizzaIngredientInOrder.objects.filter(order=instance.order, is_active=True)
    order_total_price = 0
    for ingredient in all_ingredients_in_order:
        order_total_price += ingredient.total_price

    instance.order.total_price = order_total_price
    instance.order.save(force_update=True)

post_delete.connect(post_delete_ingredients_in_order, sender=PizzaIngredientInOrder)


class IngredientsInBasket(models.Model):
    session_key = models.CharField(max_length=128, default=None)
    order = models.ForeignKey(Order, blank=True, null=True, default=None, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(PizzaIngredient, blank=True, null=True, default=None, on_delete=models.CASCADE)
    nmb = models.IntegerField("Quantity", default=1)
    price_pre_item = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # price*nmb
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    update = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return "%s" % self.ingredient.name

    class Meta:
        verbose_name = 'Ingredient in basket'
        verbose_name_plural = 'Ingredients in basket'

    def save(self, *args, **kwargs):
        price_pre_item = self.ingredient.price
        self.price_pre_item = price_pre_item
        self.total_price = int(self.nmb) * price_pre_item
        super(IngredientsInBasket, self).save(*args, **kwargs)
