from django.shortcuts import render, redirect
from .serializers import *
from .models import *
from rest_framework.generics import *
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
import jwt
from django.http import HttpResponse
from django.core.files.base import ContentFile
import re
from time import time  # Ensure 'time' is also imported
from allauth.socialaccount.providers.oauth2.client import OAuth2Error
from time import sleep
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.parsers import MultiPartParser, FormParser
import requests
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import requests
from .models import Diagnosis, EEGRecord
from .serializers import EEGRecordSerializer, DiagnosisSerializer
from .report import *
FASTAPI_URL = "http://127.0.0.1:8001/predict"
class GoogleOAuth2IatValidationAdapter(GoogleOAuth2Adapter):
    def complete_login(self, request, app, token, response, **kwargs):
        try:
            delta_time = (
                jwt.decode(
                    response.get("id_token"),
                    options={"verify_signature": False},
                    algorithms=["RS256"],
                )["iat"]
                - time()
            )
        except jwt.PyJWTError as e:
            raise OAuth2Error("Invalid id_token during 'iat' validation") from e
        except KeyError as e:
            raise OAuth2Error("Failed to get 'iat' from id_token") from e

		# Or change 30 to whatever you feel is a maximum amount of time you are willing to wait
        if delta_time > 0 and delta_time <= 30:
            sleep(delta_time)

        return super().complete_login(request, app, token, response, **kwargs)

class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
    adapter_class = GoogleOAuth2IatValidationAdapter
    callback_url = "http://localhost:5173/"
    client_class = OAuth2Client

# Create your views here.
def email_confirmation(request, key):
    return redirect(f"http://localhost:5173/dj-rest-auth/registration/account-confirm-email/{key}")

def reset_password_confirm(request, uid, token):
    return redirect(f"http://localhost:5173/reset/password/confirm/{uid}/{token}")



class PatientCreateAPIView(CreateAPIView):
    model = Patient
    serializer_class = PatientSerializer
    
class PatientRetrieveAPIView(RetrieveAPIView):
    serializer_class = PatientSerializer
    def retrieve(self, request, *args, **kwargs):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(CustomUser, id=user_id)

        patient = get_object_or_404(Patient, user=user)  

        data = {
            'patient': PatientSerializer(patient).data
        }
        
        return Response(data)
    
class UserListAPIView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    
class ProfileRetrieveAPIView(RetrieveAPIView):
    serializer_class = ProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(CustomUser, id=user_id)

        patient = get_object_or_404(Patient, user=user)  

        data = {
            'user': CustomUserSerializer(user).data,
            'patient': PatientSerializer(patient).data
        }
        
        return Response(data)
    
class ProfileAPIView(APIView):
    def put(self, request, user_id):        
        user = CustomUser.objects.filter(id=user_id).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = EEGRecordSerializer(data=request.data)

        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

FASTAPI_URL = "http://127.0.0.1:8001/predict/"  # update if needed

class DiagnosisView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = EEGRecordSerializer(data=request.data)

        if file_serializer.is_valid():
            eeg_record = file_serializer.save()  # Save EEGRecord to DB

            try:
                # Send file to FastAPI (assuming file is in request.FILES)
                file = request.FILES['file']
                files = {'file': (file.name, file, file.content_type)}
                print("Files:", file)
                patient_id = request.data.get('patient')
                patient = Patient.objects.get(id=patient_id)
                patient_serializer = PatientSerializer(patient)
                user_serializer = CustomUserSerializer(patient.user)
                response = requests.post(FASTAPI_URL, files=files)
                first_name = user_serializer.data['first_name']
                last_name = user_serializer.data['last_name']
                age = patient_serializer.data['age']
                medical_history = patient_serializer.data['medical_history']
                current_medications = patient_serializer.data['current_medications']
                gender = patient_serializer.data['gender']
                patient_info = {
                    'name': f"{first_name} {last_name}",
                    'age': age,
                    'gender': gender,
                    'medical_history': medical_history,
                    'current_medications': current_medications
                }
                print("Patient Info:", patient_info)

                if response.status_code == 200:
                    data = response.json()
                    prediction = data.get("prediction")
                    confidence = data.get("confidence")

                    # Save diagnosis
                    diagnosis = Diagnosis.objects.create(
                        eeg_record=eeg_record,
                        prediction=prediction,
                        confidence=confidence
                    )

                    diagnosis_serializer = DiagnosisSerializer(diagnosis)
                    ## Generate report using the prediction and confidence
                    report_text = generate_report_from_eeg_file(
                        file,
                        prediction, 
                        confidence,
                        patient_info
                    )
                    report_data = {
                        "title": extract_field("1. Title", report_text),
                        "name": patient_info['name'],
                        "age": patient_info['age'],
                        "gender": patient_info['gender'],
                        "medical_history": patient_info['medical_history'],
                        "classification": prediction,
                        "confidence": confidence,
                        "data_overview": extract_field("4. EEG Data Overview", report_text),
                        "key_findings": extract_field("5. Key Findings", report_text),
                        "interpretation": extract_field("6. Interpretation Of EEG Data", report_text),
                        "recommendation": extract_field("7. Recommendation", report_text),
                        "conclusion": extract_field("8. Conclusion", report_text),
                    }


                    report_html = generate_html_report(report_data)

                    # 2. Create a Django file-like object from the HTML string
                    file_name = f"EEG_Report_{report_data['name'].replace(' ', '_')}.html"
                    html_content = ContentFile(report_html.encode('utf-8'), name=file_name)

                    # 3. Save it into the Report model
                    report = Report.objects.create(
                        patient=patient,
                        diagnosis=diagnosis,
                        reportFile=html_content,  # Here you pass the ContentFile
                    )

                    # 4. Serialize if needed
                    report_serializer = ReportSerializer(report)
                    return Response(diagnosis_serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({"error": "FastAPI failed", "detail": response.text}, status=status.HTTP_502_BAD_GATEWAY)

            except Exception as e:
                return Response({"error": "Internal error", "detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DiagnosisDetailView(APIView):
    """
    Returns the latest diagnosis of a patient based on patient_id
    """

    def get(self, request, patient_id, *args, **kwargs):
        try:
            patient = Patient.objects.get(id=patient_id)
            latest_diagnosis = Diagnosis.objects.filter(eeg_record__patient=patient).order_by('-diagnosed_at').first()

            if not latest_diagnosis:
                return Response({"detail": "No diagnosis found for this patient."}, status=status.HTTP_404_NOT_FOUND)

            serializer = DiagnosisSerializer(latest_diagnosis)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Patient.DoesNotExist:
            return Response({"detail": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)

class UserDeleteView(APIView):
    """
    Deletes a user and all associated data.
    """
    # permission_classes = [IsAuthenticated]

    def delete(self, request, user_id, *args, **kwargs):
        try:
            user = CustomUser.objects.get(id=user_id)
            user.delete()
            return Response({"detail": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
            

class ReportView(APIView):
    def get(self, request, patient_id, *args, **kwargs):
        try:
            patient = Patient.objects.get(id=patient_id)
            report = Report.objects.get(patient=patient)

            if not report.reportFile:
                return Response({"error": "No report file found."}, status=status.HTTP_404_NOT_FOUND)

            # Read the file content
            with report.reportFile.open('rb') as f:
                report_html = f.read().decode('utf-8')

            return HttpResponse(report_html, content_type="text/html")
        
        except Report.DoesNotExist:
            return Response({"error": "Report not found."}, status=status.HTTP_404_NOT_FOUND)
        
class ReportDownloadView(APIView):
    """
    Downloads the report for a given diagnosis.
    """
    def get(self, request, report_id, *args, **kwargs):
        try:
            report = Report.objects.get(id=report_id)

            # Assuming you want to return the report file URL or path
            report_url = report.reportFile.url if hasattr(report.reportFile, 'url') else str(report.reportFile)
            return Response({"report_url": report_url}, status=status.HTTP_200_OK)

        except Report.DoesNotExist:
            return Response({"detail": "Report not found."}, status=status.HTTP_404_NOT_FOUND)