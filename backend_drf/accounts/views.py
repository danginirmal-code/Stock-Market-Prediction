from django.shortcuts import render

# Create your views here.
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenVerifyView
from rest_framework_simplejwt.tokens import UntypedToken
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)

class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            try:
                token = request.data.get("token")
                decoded_token = UntypedToken(token)
                
                # Extract the user ID or username from the token payload
                user_id = decoded_token.get("user_id")  # Adjust this key based on your token payload
                user = User.objects.filter(id=user_id).first()
                
                if user:
                    return Response({
                        "message": "Token is valid",
                        "user_data": {
                            "username": user.username,
                            "email": user.email,
                        }
                    }, status=status.HTTP_200_OK)
                else:
                    raise ValidationError("User not found")
            except Exception as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return response

