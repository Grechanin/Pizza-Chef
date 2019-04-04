from django.db import models

class IngredientsCategory(models.Model):
    name = models.CharField("Category name", max_length=128, blank=True, null=True, default=None)
    is_dough = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    update = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return ("%s") % self.name

    class Meta:
        verbose_name = 'Ingredients category'
        verbose_name_plural = 'Ingredients categories'

class PizzaIngredient(models.Model):
    name = models.CharField("Ingredient name",max_length=64, blank=True, null=True, default=None)
    category = models.ForeignKey(IngredientsCategory, blank=True, null=True, default=None, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    update = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return ("%s, %s UAH") % (self.name, self.price)

    class Meta:
        verbose_name = 'Pizza ingredient'
        verbose_name_plural = 'Pizza ingredients'