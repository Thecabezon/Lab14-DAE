# api/views.py

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

# --- NUEVAS IMPORTACIONES ---
from django.contrib.auth import authenticate
from rest_framework.views import APIView

from .models import Category, Serie
# --- NUEVA IMPORTACIÓN DE SERIALIZERS ---
from .serializers import CategorySerializer, SerieSerializer, UserSerializer, LoginSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    # La guía pide ordenar por 'description', tu modelo lo tiene, así que lo añado.
    queryset = Category.objects.all().order_by('description')
    serializer_class = CategorySerializer

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SerieViewSet(viewsets.ModelViewSet):
    # La guía pide ordenar por 'name', tu modelo lo llama 'title'. Usaré 'title'.
    queryset = Serie.objects.all().order_by('title')
    serializer_class = SerieSerializer

    def get_queryset(self):
        queryset = Serie.objects.all().order_by('title')
        category_id = self.request.query_params.get('category', None)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset

# --- NUEVO CÓDIGO AÑADIDO ---

class LoginView(APIView):
    """
    Vista para el login de usuarios.
    Utiliza el método POST para recibir credenciales.
    """
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            
            user = authenticate(username=username, password=password)
            
            if user:
                user_serializer = UserSerializer(user)
                return Response(user_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)