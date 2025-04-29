from django.urls import path
from .views import *

urlpatterns = [
    # path('register/', RegisterUserView.as_view(), name="register"),
    # path('verify-email/', VerifyUserEmail.as_view(), name="verify-email"),
    # path('login/', LoginUserView.as_view(), name="login"),
    # path('test/', TestAuthenticateView.as_view(), name="test"),
    path('patients/create/', PatientCreateAPIView.as_view(), name="patient-create"),
    path('patients/<int:user_id>', PatientRetrieveAPIView.as_view(), name="patient-list"),
    path('users/', UserListAPIView.as_view(), name="user-list"),
    path('profile/<int:user_id>/', ProfileRetrieveAPIView.as_view(), name="profile-list"),
    path('profile/update/<int:user_id>/', ProfileAPIView.as_view(), name='profile-update'),  
    path('upload/', FileUploadView.as_view(), name='file-upload'), 
    path('classify/', DiagnosisView.as_view(), name='classify'),
    path('diagnosis/<int:patient_id>/', DiagnosisDetailView.as_view(), name='diagnosis-detail'),
    path('user/delete/<int:user_id>/', UserDeleteView.as_view(), name='user-delete'),
    path('report/<int:patient_id>/', ReportView.as_view(), name='report'),
    path('report/download/<int:report_id>/', ReportDownloadView.as_view(), name='report-download'),
    
]