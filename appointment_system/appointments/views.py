from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Doctor, TimeSlot, Appointment
from .serializers import DoctorSerializer, TimeSlotSerializer, AppointmentSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer

    @action(detail=False, methods=['get'])
    def available(self, request):
        available_slots = TimeSlot.objects.filter(available=True)
        serializer = self.get_serializer(available_slots, many=True)
        return Response(serializer.data)

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
