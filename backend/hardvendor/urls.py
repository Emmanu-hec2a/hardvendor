from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from core.views_admin import admin_dashboard_stats, get_me, change_password, get_system_settings, update_system_setting
from core.views_auth import GoogleLogin
from core.auth import EmailAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/v1/settings/', get_system_settings, name='get_settings'),
    path('api/v1/admin/settings/update/', update_system_setting, name='update_setting'),
    path('api/v1/auth/token/', EmailAuthToken.as_view(), name='api_token_auth'),
    path('api/v1/auth/me/', get_me, name='auth_me'),
    path('api/v1/auth/change-password/', change_password, name='change_password'),
    path('api/v1/auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('api/v1/auth/', include('dj_rest_auth.urls')),
    path('api/v1/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/v1/admin/dashboard/', admin_dashboard_stats, name='admin_dashboard'),
    path('api/v1/', include([
        path('products/', include('products.urls')),
        path('categories/', include('products.urls_categories')),
        path('orders/', include('orders.urls')),
        path('payments/', include('payments.urls')),
    ])),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
