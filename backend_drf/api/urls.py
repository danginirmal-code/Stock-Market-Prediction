from django.urls import path,include
from accounts import views as UserViews
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
# from accounts.views import CustomTokenVerifyView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .views import StockPredictionAPIView

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected route"})

urlpatterns = [
    path("register/", UserViews.RegisterView.as_view(), name="user"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', ProtectedView.as_view(), name='protected_route'),
    path('predict/', StockPredictionAPIView.as_view(), name='protected_route'),
]
