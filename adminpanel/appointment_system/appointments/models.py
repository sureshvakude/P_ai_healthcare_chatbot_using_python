from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=255)
    specialty = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    rating = models.FloatField()
    image = models.ImageField(upload_to='doctor_images/')  # Changed to ImageField

    def __str__(self):
        return self.name

class TimeSlot(models.Model):
    doctor = models.ForeignKey(Doctor, related_name='time_slots', on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.doctor.name} - {self.date} {self.time}"

class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, related_name='appointments', on_delete=models.CASCADE)
    time_slot = models.ForeignKey(TimeSlot, related_name='appointments', on_delete=models.CASCADE)
    patient_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    reason = models.TextField()
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appointment with {self.doctor.name} on {self.time_slot.date} at {self.time_slot.time}"
