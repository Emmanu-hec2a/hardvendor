from rest_framework import serializers
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate

class EmailAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email') or request.data.get('username')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'Please provide both email and password'}, status=400)
            
        user = authenticate(request, username=email, password=password)
        
        if not user:
            return Response({'error': 'Invalid credentials'}, status=401)
            
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
