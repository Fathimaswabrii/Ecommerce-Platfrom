from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Product

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "password"]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class ProductSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Product
        fields = ["id", "owner", "name", "description", "price", "created_at"]
        read_only_fields = ["id", "owner", "created_at"]