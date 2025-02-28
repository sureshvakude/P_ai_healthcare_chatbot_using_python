import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Search, User, Phone, Mail, CheckCircle } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  location: string;
  distance: string;
  rating: number;
  availableDates: string[];
  image: string;
}

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

export const AppointmentBooking: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    reason: ''
  });
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Sample data for doctors
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Practitioner",
      location: "123 Health St, Cityville",
      distance: "1.2 miles",
      rating: 4.8,
      availableDates: ["2025-06-01", "2025-06-02", "2025-06-03"],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiologist",
      location: "456 Medical Ave, Townsburg",
      distance: "2.5 miles",
      rating: 4.9,
      availableDates: ["2025-06-02", "2025-06-04", "2025-06-05"],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      location: "789 Care Blvd, Healthtown",
      distance: "0.8 miles",
      rating: 4.7,
      availableDates: ["2025-06-01", "2025-06-03", "2025-06-05"],
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Dermatologist",
      location: "321 Skin St, Dermaville",
      distance: "3.1 miles",
      rating: 4.6,
      availableDates: ["2025-06-02", "2025-06-04", "2025-06-06"],
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 5,
      name: "Dr. Lisa Patel",
      specialty: "Neurologist",
      location: "567 Brain Ave, Neurotown",
      distance: "4.2 miles",
      rating: 4.9,
      availableDates: ["2025-06-01", "2025-06-03", "2025-06-05"],
      image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  // Sample specialties
  const specialties = [
    "General Practitioner",
    "Cardiologist",
    "Pediatrician",
    "Dermatologist",
    "Neurologist",
    "Orthopedist",
    "Gynecologist",
    "Ophthalmologist",
    "Psychiatrist",
    "Dentist"
  ];

  // Sample time slots
  const timeSlots: TimeSlot[] = [
    { id: 1, time: "9:00 AM", available: true },
    { id: 2, time: "10:00 AM", available: true },
    { id: 3, time: "11:00 AM", available: false },
    { id: 4, time: "1:00 PM", available: true },
    { id: 5, time: "2:00 PM", available: true },
    { id: 6, time: "3:00 PM", available: false },
    { id: 7, time: "4:00 PM", available: true }
  ];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep(2);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setBookingStep(3);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingStep(4);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the booking data to a server
    setBookingComplete(true);
  };

  const resetBooking = () => {
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setPatientInfo({
      name: '',
      phone: '',
      email: '',
      reason: ''
    });
    setBookingStep(1);
    setBookingComplete(false);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (bookingComplete) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your appointment with {selectedDoctor?.name} has been scheduled for {formatDate(selectedDate!)} at {selectedTime}.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
          <h3 className="font-semibold text-blue-800 mb-2">Appointment Details:</h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start">
              <User className="h-5 w-5 mr-2 mt-0.5" />
              <span>{selectedDoctor?.name} ({selectedDoctor?.specialty})</span>
            </li>
            <li className="flex items-start">
              <Calendar className="h-5 w-5 mr-2 mt-0.5" />
              <span>{formatDate(selectedDate!)}</span>
            </li>
            <li className="flex items-start">
              <Clock className="h-5 w-5 mr-2 mt-0.5" />
              <span>{selectedTime}</span>
            </li>
            <li className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 mt-0.5" />
              <span>{selectedDoctor?.location}</span>
            </li>
          </ul>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          A confirmation email has been sent to {patientInfo.email}. You'll receive a reminder 24 hours before your appointment.
        </p>
        <button
          onClick={resetBooking}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Progress Steps */}
      <div className="bg-blue-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white mb-4">Book an Appointment</h2>
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  bookingStep >= step ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'
                }`}
              >
                {step}
              </div>
              <span className="text-xs text-blue-100 mt-1">
                {step === 1 && "Find Doctor"}
                {step === 2 && "Select Date"}
                {step === 3 && "Select Time"}
                {step === 4 && "Confirm"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        {bookingStep === 1 && (
          <div>
            <div className="mb-6">
              <div className="flex mb-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by doctor name or location"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-2 border border-gray-300 border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div 
                    key={doctor.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <div className="flex">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-20 h-20 rounded-full object-cover mr-4"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-blue-600">{doctor.specialty}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{doctor.location} ({doctor.distance})</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No doctors found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {bookingStep === 2 && selectedDoctor && (
          <div>
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setBookingStep(1)}
                className="mr-4 text-blue-600 hover:text-blue-800"
              >
                ← Back to doctors
              </button>
              <h3 className="text-lg font-semibold">Select a date for {selectedDoctor.name}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedDoctor.availableDates.map((date) => (
                <div 
                  key={date}
                  onClick={() => handleDateSelect(date)}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="font-medium">{formatDate(date)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Multiple time slots available</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookingStep === 3 && selectedDoctor && selectedDate && (
          <div>
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setBookingStep(2)}
                className="mr-4 text-blue-600 hover:text-blue-800"
              >
                ← Back to dates
              </button>
              <h3 className="text-lg font-semibold">
                Select a time for {selectedDoctor.name} on {formatDate(selectedDate)}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {timeSlots.map((slot) => (
                <div 
                  key={slot.id}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  className={`border rounded-lg p-4 text-center ${
                    slot.available 
                      ? 'border-gray-200 hover:border-blue-500 cursor-pointer' 
                      : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                  } transition-colors`}
                >
                  <div className="flex items-center justify-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    <span className={slot.available ? 'font-medium' : 'text-gray-400'}>{slot.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {slot.available ? 'Available' : 'Unavailable'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookingStep === 4 && selectedDoctor && selectedDate && selectedTime && (
          <div>
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setBookingStep(3)}
                className="mr-4 text-blue-600 hover:text-blue-800"
              >
                ← Back to times
              </button>
              <h3 className="text-lg font-semibold">Confirm your appointment</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Appointment Details:</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start">
                      <User className="h-5 w-5 mr-2 mt-0.5" />
                      <span>{selectedDoctor.name} ({selectedDoctor.specialty})</span>
                    </li>
                    <li className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 mt-0.5" />
                      <span>{formatDate(selectedDate)}</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 mt-0.5" />
                      <span>{selectedTime}</span>
                    </li>
                    <li className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                      <span>{selectedDoctor.location}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Important Information:</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Please arrive 15 minutes before your appointment time.</li>
                    <li>• Bring your insurance card and ID.</li>
                    <li>• Wear a mask during your visit.</li>
                    <li>• You can cancel or reschedule up to 24 hours before your appointment.</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={patientInfo.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={patientInfo.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={patientInfo.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                        Reason for Visit
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        value={patientInfo.reason}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Briefly describe your symptoms or reason for the appointment"
                      ></textarea>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Confirm Appointment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};