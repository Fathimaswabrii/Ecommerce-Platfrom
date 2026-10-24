from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProductViewSet, SignupView

router = DefaultRouter()
router.register("products", ProductViewSet)

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("", include(router.urls)),
]