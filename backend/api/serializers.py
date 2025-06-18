# api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User  # <--- Importar el modelo User de Django
from .models import Category, Serie

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Serie
        # He cambiado 'title' por 'name' y 'release_date' por 'date_release' 
        # para que coincida con la guía del laboratorio. Si tus modelos usan
        # 'title' y 'release_date', déjalos como estaban.
        # Por ahora, mantengo los nombres de tu modelo original.
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Asumiendo que tu modelo Serie tiene un campo 'category' que es ForeignKey a Category
        representation['category'] = CategorySerializer(instance.category).data
        return representation

# --- NUEVO CÓDIGO AÑADIDO ---

class UserSerializer(serializers.ModelSerializer):
    """
    Serializador para los datos del usuario.
    Excluimos campos sensibles como la contraseña.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class LoginSerializer(serializers.Serializer):
    """
    Serializador para validar las credenciales de login.
    No está asociado a un modelo.
    """
    username = serializers.CharField()
    password = serializers.CharField(write_only=True) # write_only para no mostrarlo en respuestas