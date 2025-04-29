import random
from django.core.mail import EmailMessage
from .models import *
from django.conf import settings
def generateOtp():
    otp=''
    for i in range(6):
        otp+=str(random.randint(0,9))
    return otp

def send_code_to_user(email):
    Subject = "One time passcode for Email Verification"
    otp = generateOtp()
    print(otp)
    user = CustomUser.objects.get(email=email)
    current_site = 'myAuth.com'
    email_body = f"Hello {user.first_name},\n\nYour one time passcode for email verification is {otp}.\n\nIf you did not request this code, please ignore this email.\n\nRegards,\nMyAuth Team"
    from_email = settings.DEFAULT_FROM_EMAIL
    
    OneTimePasscode.objects.create(user=user, code=otp)
    email = EmailMessage(subject=Subject, body=email_body, from_email=from_email, to=[email])
    email.send(fail_silently=True)
    

def send_normal_email(data):
    email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[data['to_email']]
    )
    email.send()