from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .managers import CustomUserManager
from rest_framework_simplejwt.tokens import RefreshToken

# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = None
    email = models.EmailField(unique=True, max_length=255,verbose_name=_("Email Address"))
    first_name = models.CharField(max_length=100, verbose_name=_("First Name"))
    last_name = models.CharField(max_length=100, verbose_name=_("Last Name"))
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(default=timezone.now)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['first_name','last_name']
    
    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
class Patient(models.Model):
    """
    Stores additional details for patients.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="patient")
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")], blank=True)
    medical_history = models.TextField(blank=True)
    current_medications = models.TextField(blank=True)

    def __str__(self):
        return f"Profile of {self.user.email}"

class EEGRecord(models.Model):
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="eeg_records")
    file = models.FileField(upload_to="file_uploads/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"EEG Record {self.id} by {self.patient.user.email}"

class Diagnosis(models.Model):
    """
    Stores AI model predictions for EEG records.
    """
    eeg_record = models.OneToOneField(EEGRecord, on_delete=models.CASCADE, related_name="diagnosis")
    prediction = models.CharField(max_length=50, choices=[("Healthy", "Healthy"), ("Parkinson's Detected", "Parkinson's Detected")])
    confidence = models.FloatField()  # Confidence score of AI model (0-1)
    diagnosed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Diagnosis for {self.eeg_record.patient.user.email}: {self.prediction} ({self.confidence * 100:.2f}%)"

class Report(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="reports")
    diagnosis = models.OneToOneField(Diagnosis, on_delete=models.CASCADE, related_name="report")
    reportFile = models.FileField(upload_to="brainova_reports/")
    reportDate = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Report for {self.patient.user.email}"
    
