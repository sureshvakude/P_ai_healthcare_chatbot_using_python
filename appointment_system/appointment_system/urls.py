from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = 'HealthCare Admin'
admin.site.index_title = 'HealthCare Admin Index'
admin.site.site_title = 'HealthCare Admin'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('appointments.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
