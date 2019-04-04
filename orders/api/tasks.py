from django.core.mail import send_mail
# from pizza_chef.mailer import Mailer
from pizza_chef.celery import app


@app.task
def async_send_mail(client_subject, client_message, from_email, to_client_email, fail_silently, html_message):
    send_mail(
            client_subject,
            client_message,
            from_email,
            to_client_email,
            fail_silently=False,
            html_message=html_message
        )


# @app.task
# def async_send_mail(client_subject, context, to_client_email):
#         mail = Mailer()
#         mail.send_messages(subject=client_subject,
#                            template='orders/client_message.html',
#                            context=context,
#                            to_emails=to_client_email)