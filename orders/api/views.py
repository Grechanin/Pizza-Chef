from orders.models import (
                                IngredientsInBasket,
                                Order,
                                PizzaIngredientInOrder        
                            )
from .serializers import (
                            IngredientsInBasketCreateSerializer,
                            OrderCreateAPISerializer,
                            PizzaIngredientInOrderCreateAPISerializer
						)
from rest_framework import generics
from pizza_chef import settings
from django.template import loader
from django.core.mail import send_mail

from django.http import HttpResponse
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .tokens import order_activation_token
from .tasks import async_send_mail
from pizza_chef.mailer import Mailer



class IngredientsInBasketListCreateAPI(generics.ListCreateAPIView):    
    serializer_class = IngredientsInBasketCreateSerializer


    def get_queryset(self):
        session_key = self.request.session.session_key
        if not session_key:
            self.request.session.cycle_key()
        queryset = IngredientsInBasket.objects.filter(session_key=session_key, is_active=True, order__isnull=True)
        return queryset

    def perform_create(self, serializer):
        data = self.request.data

        ingredient_id = data.get("ingredient")
        nmb = data.get("nmb")
        nmb = int(nmb)

        try:
            IngredientsInBasket.objects.get(session_key=self.request.session.session_key, ingredient_id=ingredient_id, is_active=True)
        except IngredientsInBasket.DoesNotExist:
            serializer.save(session_key=self.request.session.session_key, ingredient_id=ingredient_id, nmb=nmb)


        

class IngredientInBasketUpdateAPI(generics.UpdateAPIView):    
    serializer_class = IngredientsInBasketCreateSerializer
    lookup_field = 'id'
    queryset = IngredientsInBasket.objects.filter(is_active=True)


class IngredientInBasketRetrieveDestroyAPI(generics.RetrieveDestroyAPIView):
    serializer_class = IngredientsInBasketCreateSerializer    
    lookup_field = 'id'
    def get_queryset(self):
        session_key = self.request.session.session_key
        print(session_key)
        queryset = IngredientsInBasket.objects.filter(session_key=session_key, is_active=True, order__isnull=True)
        return queryset


class OrderCreateAPI(generics.CreateAPIView):    
    serializer_class = OrderCreateAPISerializer


class PizzaIngredientInOrderCreateAPI(generics.CreateAPIView):    
    serializer_class = PizzaIngredientInOrderCreateAPISerializer
    queryset = PizzaIngredientInOrder.objects.all()

    def perform_create(self, serializer):
        data = self.request.data

        order_id = data.get("order")

        ingredients_in_baslet = IngredientsInBasket.objects.filter(session_key=self.request.session.session_key, is_active=True)
        for ingredient_in_baslet in ingredients_in_baslet:
            PizzaIngredientInOrder.objects.create(order_id=order_id, ingredient=ingredient_in_baslet.ingredient, nmb=ingredient_in_baslet.nmb)
            ingredient_in_baslet.order = Order.objects.get(id=order_id)
            ingredient_in_baslet.is_active = False
            ingredient_in_baslet.save(force_update=True)


        order = Order.objects.get(id=order_id)
        name = order.name
        phone = order.phone
        email = order.email
        comments = order.comments


        ingredients_in_order = PizzaIngredientInOrder.objects.filter(order=order)

        current_site = get_current_site(self.request)
        client_subject = 'Activate your pizza order.'
        client_message_html = loader.render_to_string('orders/client_message.html', {
            'order': order,
            'ingredients_in_order': ingredients_in_order,
            'domain': current_site.domain,
            'uid':urlsafe_base64_encode(force_bytes(order.pk)),
            'token':order_activation_token.make_token(order),
        })


        client_message = '%s thanks for your order! \nPlease click on the link to confirm your order' % name
        
        from_email = settings.EMAIL_HOST_USER
        to_client_email = [email]     

        # Sync way to send email
        # send_mail(
        #     client_subject,
        #     client_message,
        #     from_email,
        #     to_client_email,
        #     fail_silently=False,
        #     html_message=client_message_html
        # )

        # Async way to send email
        # async_send_mail.delay(
        #     client_subject,
        #     client_message,
        #     from_email,
        #     to_client_email,
        #     fail_silently=False,
        #     html_message=client_message_html
        # )


        # Async way to send email using custom class Mailer
        mail = Mailer(from_email=settings.EMAIL_HOST_USER)
        mail.send_messages(subject=client_subject,
                           template='orders/client_message.html',
                           context={
                                    'order': order,
                                    'ingredients_in_order': ingredients_in_order,
                                    'domain': current_site.domain,
                                    'uid': urlsafe_base64_encode(force_bytes(order.pk)),
                                    'token': order_activation_token.make_token(order)
                                    },
                           to_emails=[email])



def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        order = Order.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, Order.DoesNotExist):
        order = None
    if order is not None and order_activation_token.check_token(order, token):
        order.is_active = True
        order.save()

        from_email = settings.EMAIL_HOST_USER
        admin_subject = 'New pizza order from %s' % order.name
        admin_massege = 'Client: %s \nPhone: %s \nEmail: %s \nComment: %s' % (order.name, 
                                                                                    order.phone,
                                                                                    order.email,
                                                                                    order.comments
                                                                                    )
        ingredients_in_order = PizzaIngredientInOrder.objects.filter(order=order)
        html_message = loader.render_to_string(
                                                'orders/email_message.html',
                                                {
                                                'ingredients_in_order': ingredients_in_order,
                                                'order':  order, 
                                                }
                                            )
        
        to_admin_email = [settings.EMAIL_HOST_USER]
        send_mail(
            admin_subject,
            admin_massege,
            from_email,
            to_admin_email,
            fail_silently=False,
            html_message=html_message,
        )

        return HttpResponse('Thank you for your email confirmation. Now your pizza in progress.')
    else:
        return HttpResponse('Activation link is invalid!')
