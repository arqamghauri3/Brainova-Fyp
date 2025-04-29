from rest_framework import serializers
from .models import *


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id","first_name", "last_name", "email"]
        
class PatientSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Patient
        fields = ["id", "user", "age", "gender", "medical_history", "current_medications"]

class ProfileSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(required=False, allow_null=True)
    gender = serializers.ChoiceField(choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")], required=False, allow_blank=True)
    medical_history = serializers.CharField(required=False, allow_blank=True)
    current_medications = serializers.CharField(required=False, allow_blank=True)
    
    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'age', 'gender', 'medical_history', 'current_medications']
    
    def update(self, instance, validated_data):
        patient_data = {
            'age': validated_data.pop('age', None),
            'gender': validated_data.pop('gender', ''),
            'medical_history': validated_data.pop('medical_history', ''),
            'current_medications': validated_data.pop('current_medications', '')
        }
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        
        patient, created = Patient.objects.get_or_create(user=instance)
        for attr, value in patient_data.items():
            setattr(patient, attr, value)
        patient.save()
        
        return instance
    
class EEGRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = EEGRecord
        fields = ['id', 'patient', 'file', 'uploaded_at']
        
class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = ['id', 'eeg_record', 'prediction', 'confidence', 'diagnosed_at']

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'patient', 'diagnosis', 'reportFile', 'reportDate']