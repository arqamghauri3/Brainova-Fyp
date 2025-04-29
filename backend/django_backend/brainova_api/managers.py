from django.contrib.auth.models import BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def email_validation(self, email):
        """Validates email format."""
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(_("You must provide a valid email"))

    def create_user(self, email, first_name, last_name="", password=None, **extra_fields):
        """Creates and returns a regular user."""
        if not email:
            raise ValueError(_("Email is a required field"))
        if not first_name:
            raise ValueError(_("First name is a required field"))

        email = self.normalize_email(email)
        self.email_validation(email)

        # Ensure fields are properly assigned
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_patient", True)
        extra_fields.setdefault("is_verified", False)

        user = self.model(email=email, first_name=first_name, last_name=last_name or "", **extra_fields)

        if password:
            user.set_password(password)  # Hash password properly

        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name=None, password=None, **extra_fields):
        """Creates and returns a superuser with elevated privileges."""
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True"))
        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True"))

        user = self.create_user(email, first_name, last_name, password, **extra_fields)
        return user
